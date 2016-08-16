<?php

use DreamsArk\Commands\Project\Submission\VoteOnSubmissionCommand;
use DreamsArk\Jobs\Project\CreateProjectJob;
use DreamsArk\Jobs\Project\Stages\Voting\CloseVotingJob;
use DreamsArk\Jobs\Project\Stages\Voting\OpenVotingJob;
use DreamsArk\Jobs\Project\Submission\CreateSubmissionJob;
use DreamsArk\Jobs\Project\TestJob;
use DreamsArk\Jobs\Project\TestJob2;
use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\Project\Submission;

/**
 * Class ProjectBasicCycleTest
 */
class ProjectBasicCycleTest extends TestCase
{

    use FakerTrait, UserTrait;

    /**
     * Create a project
     *
     * @test
     */
    public function it_creates_a_new_project()
    {

        $user = $this->createUser();
        $user->getAttribute('bag')->update(['coins' => 2000]);

        $data = [
            'name' => 'My Test Project',
            'content' => $this->faker->text,
            'voting_date' => \Carbon\Carbon::today()->toDateTimeString()
        ];

        $project = dispatch(new CreateProjectJob(
            $user, $data, $user->getAttribute('bag')->coins
        ));

        $this->assertTrue($project->exists);
        $this->assertInstanceOf(Idea::class, $project->stage);
        $this->assertTrue($project->stage->active);

        return $project;
    }

    /**
     * Create a project
     *
     * @test
     */
    public function it_makes_submissions_to_project()
    {

        $project = $this->it_creates_a_new_project();

        foreach (range(1, 10) as $index) {

            $user = $this->createUser();

            dispatch(
                new CreateSubmissionJob($project, $user, [
                    'content' => $this->faker->text,
                    "visibility" => 1
                ])
            );
        }

        $this->assertCount(10, $project->stage->submissions);

        return $project;
    }

    /**
     * @test
     * @param $project
     * @return mixed
     */
    public function it_open_voting_and_select_a_winner()
    {

        $project = $this->it_makes_submissions_to_project();

        $vote = $project->stage->vote;

        $this->assertFalse($vote->active);

        dispatch(new OpenVotingJob(
            $project->stage->vote
        ));

        $this->assertTrue($vote->active);

        /**
         * Create a bunch of users
         */
        $users = array_map([$this, 'createUser'], array_chunk(range(1, 10), 1));
        $winnerSubmission = $project->stage->submissions->first();

        /**
         * Vote Randomly on each submission by different users
         */
        foreach ($project->stage->submissions as $submission) {

            /**
             * for each random user vote on submissions
             */
            foreach (range(1, 20) as $index) {

                $user = $users[array_rand($users)];

                dispatch(new VoteOnSubmissionCommand(
                    rand(1, 5), $submission, $user
                ));
            }

        }

        /**
         * Win the voting
         */
        dispatch(new VoteOnSubmissionCommand(1000, $winnerSubmission, $this->createUser()));

        /**
         * Close Voting
         */
        dispatch(new CloseVotingJob($vote));

        $this->assertFalse($vote->active);

        $this->assertInstanceOf(Submission::class, $project->stage->fresh()->submission);

        return $project;

    }

    /**
     * @test
     */
    public function it_moves_project_trough_all_stages()
    {

//        $project = $this->it_open_voting_and_select_a_winner();
//
//        foreach (['synapse', 'script'] as $stage) {
//
//            dispatch(new CreateProjectStageJob(
//                $project, $stage, ['content' => 'hi', 'voting_date' => Carbon\Carbon::now()->toDateTimeString()], 100
//            ));
//
//        }
    }
}

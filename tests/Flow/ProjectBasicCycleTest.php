<?php

use DreamsArk\Commands\Project\Submission\VoteOnSubmissionCommand;
use DreamsArk\Jobs\Project\CreateProjectJob;
use DreamsArk\Jobs\Project\Stages\Voting\OpenVotingJob;
use DreamsArk\Jobs\Project\Submission\CreateSubmissionJob;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class ProjectBasicCycleTest
 */
class ProjectBasicCycleTest extends TestCase
{

    use DatabaseTransactions, FakerTrait, UserTrait;

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
                    "visibility" => (boolean)rand(0, 1)
                ])
            );
        }

        $this->assertCount(10, $project->stage->submissions);

        return $project;
    }

    /**
     * @test
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

        foreach ($project->stage->submissions as $submission) {

            $users = array_map([$this, 'createUser'], array_chunk(range(1, 10), 1));

            foreach (range(1, 20) as $index) {

                $user = $users[array_rand($users)];

                dispatch(new VoteOnSubmissionCommand(
                    $user->getAttribute('bag')->coins, $submission, $user
                ));

            }

            dd($submission->votes->pluck('pivot.amount'));

        }
    }
}

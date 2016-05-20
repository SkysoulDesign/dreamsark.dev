<?php

use DreamsArk\Commands\Project\Submission\VoteOnSubmissionCommand;
use DreamsArk\Jobs\Project\Committee\Review\PublishProjectReviewJob;
use DreamsArk\Jobs\Project\Committee\Review\ReviewCreateCrewJob;
use DreamsArk\Jobs\Project\Committee\Review\ReviewCreateExpenseJob;
use DreamsArk\Jobs\Project\CreateProjectJob;
use DreamsArk\Jobs\Project\Expenditure\BackProjectJob;
use DreamsArk\Jobs\Project\Expenditure\EnrollProjectJob;
use DreamsArk\Jobs\Project\Stages\Review\CreateReviewJob;
use DreamsArk\Jobs\Project\Stages\Script\CreateScriptJob;
use DreamsArk\Jobs\Project\Stages\Synapse\CreateSynapseJob;
use DreamsArk\Jobs\Project\Stages\Voting\CloseVotingJob;
use DreamsArk\Jobs\Project\Stages\Voting\OpenVotingJob;
use DreamsArk\Jobs\Project\Submission\SubmitJob;
use DreamsArk\Jobs\Project\VoteOnEnrollablePositionJob;
use DreamsArk\Jobs\User\Profile\CreateProfileJob;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Distribution;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Review;
use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Models\User\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class CreateProjectCompleteCycleTest
 */
class CreateProjectCompleteCycleTest extends TestCase
{
    use DatabaseTransactions, UserTrait, ProfileTrait;
    /**
     * @var Project
     */
    private $project;

    /**
     * This is TestCase for Create Project With Complete Cycle Till Funding Stage enabled.
     *
     * @test
     */
    public function it_creates_complete_cycle_of_project()
    {

        $this->createProjectEvent($this->createUser());

        $this->assertEquals(Fund::class, get_class($this->project->stage), 'Project Not in Fund Stage');

        $this->assertTrue(true);
    }

    /**
     * @test
     */
    public function it_creates_project_and_enroll_voting()
    {
        $this->createProjectEvent($this->createUser());

        $this->doVotingOnEnrollAndClose($this->project->id);

        $this->assertEquals(Distribution::class, get_class($this->project->stage), 'Project Not in Distribution Stage');

        $this->assertTrue(true);
    }

    /**
     * @param string $user
     */
    protected function createProjectEvent($user = '')
    {

        if (!$user instanceof User)
            $user = $this->createUser();

        /**
         * Create Project in Idea Stage
         */
        $fields = array(
            'name'    => 'My Super Project - ' . rand(1, 10),
            'content' => 'This is a Script',
        );
        $reward = ['idea' => 50];

        /** @var Project $project */
        $project = dispatch(new CreateProjectJob($user, $fields, $reward));
        $projectId = $project->id;

        /**
         * Get Project
         */
        $project = Project::find($projectId);

        /**
         * Process
         */
        $this->openNextStage($project, $user, $project->stage->vote);

        /**
         * Start Synapse Stage
         */
        $fields = array(
            'content' => 'Now i will become a Synapse',
            'reward'  => '150'
        );
        dispatch(new CreateSynapseJob($project->id, $fields));

        /**
         * Get Project
         */
        $project = Project::find($projectId);

        /**
         * Process
         */
        $this->openNextStage($project, $user, $project->stage->vote);

        /**
         * Start Script Stage
         */
        $fields = array(
            'content' => 'Now i will become a Script',
            'reward'  => '500'
        );
        dispatch(new CreateScriptJob($project->id, $fields));

        /**
         * Get Project
         */
        $project = Project::find($projectId);

        /**
         * Process
         */
        $this->openNextStage($project, $user, $project->stage->vote);

        /**
         * Add Crew
         */
        $this->addCrew($project);

        /**
         * Add Expenses
         */
        $this->addExpense($project);

        /**
         * Release the Project Back
         */
        $review = $project->review;//Review::find($project->id);
        if (!$review instanceof Review) {
            $review = dispatch(new CreateReviewJob($project));
        }
        dispatch(new PublishProjectReviewJob($review));

        $project = Project::find($projectId);
        /**
         * Back The Project
         */
        collect(range(1, 20))->each(function () use ($project) {
            dispatch(new BackProjectJob($project, $this->createUser(), rand(1, 10)));
        });

        /**
         * Enroll to Project
         */
        $expenditures = $project->enrollable;
        /** @var Faker\Generator $faker */
        $faker = app(Faker\Generator::class);
        $expenditures->each(function ($expenditure) use ($faker) {
            $profile = $expenditure->expenditurable->profile;
            /** to create two enrollers for a profile */
            collect([1, 2])->each(function () use ($expenditure, $faker, $profile) {
                $user = $this->createUser();
                if (!$user->hasProfile($profile)) {
                    $answers = [];
                    foreach ($profile->questions as $question) {
                        array_set($answers, "question_$question->id", $faker->realText(rand(20, 30)));
                    }
                    /** @var User $user */
                    $user = dispatch(new CreateProfileJob($answers, $user, $profile->fresh()));
                }
                dispatch(new EnrollProjectJob($expenditure, $user));
            });
        });

        /**
         * Process Project
         */
        $project = Project::find($projectId);
        dispatch(new OpenVotingJob($project->stage->vote));

        /*$enrollers = Enroller::all();
        $enrollers->each(function ($enroller) {
            dispatch(new VoteOnEnrollablePositionJob($enroller, $this->createUser(), rand(1, 100)));
        });*/

        $this->project = Project::find($projectId);

    }

    protected function doVotingOnEnrollAndClose($projectId)
    {
        $this->project = Project::find($projectId)->load('enrollable');

        $amount = 0;
        foreach ($this->project->enrollable as $expenditure) {
            if (!$expenditure->enrollers->isEmpty()) {
                foreach ($expenditure->enrollers as $enroller) {
                    $enrollVote = rand(1, 100);
                    $amount += $enrollVote;
                    dispatch(new VoteOnEnrollablePositionJob($enroller, $this->createUser(), $enrollVote));
                }
            }
        }

        /**
         * Close the Voting
         */
        sleep(2);
        dispatch(new CloseVotingJob($this->project->stage->vote->id));

        $this->project = Project::find($projectId);
    }

    /**
     * Open submit Close Command
     *
     * @param Project $project
     * @param User $user
     * @param Vote $vote
     */
    public function openNextStage(Project $project, User $user, Vote $vote)
    {

        /**
         * Submit To Project
         */
        $fields = array(
            'content'    => 'Dummy Submission',
            'visibility' => '1'
        );

        collect(range(1, 10))->each(function () use ($project, $user, $fields) {
            dispatch(new SubmitJob($project, $user, $fields));
        });

        /**
         * Open project Voting
         */
        dispatch(new OpenVotingJob($vote));

        /**
         * Vote on Some Submissions
         */
        $submissions = Submission::all();

        collect(range(1, 10))->each(function () use ($submissions, $user) {
            dispatch(new VoteOnSubmissionCommand(rand(1, 50), $submissions->random(), $user));
        });

        /**
         * Close the Voting
         */
        dispatch(new CloseVotingJob($vote->id));

    }

    /**
     * Add Crew
     *
     * @param Project $project
     */
    public function addCrew(Project $project)
    {
        collect([
            [
                'name'        => 'Crew ' . rand(1, 5),
                'cost'        => rand(0, 500),
                'profile_id'  => $this->createProfile(),
                'description' => 'Super Nice Guy.'
            ],
            [
                'name'        => 'Crew ' . rand(1, 5),
                'cost'        => rand(0, 500),
                'profile_id'  => $this->createProfile(),
                'description' => 'He will do everything.'
            ]
        ])->each(function ($crew) use ($project) {
            dispatch(new ReviewCreateCrewJob($project, $crew));
        });
    }

    /**
     * Add Expense
     *
     * @param Project $project
     */
    public function addExpense(Project $project)
    {
        collect([
            [
                'cost'        => rand(1, 200),
                'name'        => 'Dummy expense ' . rand(1, 5),
                'description' => 'This will be very expansive'
            ],
            [
                'cost'        => rand(1, 200),
                'name'        => 'Dummy expense ' . rand(1, 5),
                'description' => 'We need this.'
            ],
            [
                'cost'        => rand(1, 200),
                'name'        => 'Dummy expense ' . rand(1, 5),
                'description' => 'Cheap thing.'
            ]
        ])->each(function ($expanse) use ($project) {
            dispatch(new ReviewCreateExpenseJob($project, $expanse));
        });
    }
}

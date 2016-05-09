<?php

use DreamsArk\Commands\Project\Stages\Voting\CloseVotingCommand;
use DreamsArk\Commands\Project\Stages\Voting\OpenVotingCommand;
use DreamsArk\Commands\Project\Submission\SubmitCommand;
use DreamsArk\Commands\Project\Submission\VoteOnSubmissionCommand;
use DreamsArk\Commands\Project\VoteOnEnrollablePositionCommand;
use DreamsArk\Jobs\Project\Committee\Review\PublishProjectReviewJob;
use DreamsArk\Jobs\Project\Committee\Review\ReviewCreateCrewJob;
use DreamsArk\Jobs\Project\Committee\Review\ReviewCreateExpenseJob;
use DreamsArk\Jobs\Project\CreateProjectJob;
use DreamsArk\Jobs\Project\Expenditure\BackProjectJob;
use DreamsArk\Jobs\Project\Expenditure\EnrollProjectJob;
use DreamsArk\Jobs\Project\Stages\Script\CreateScriptJob;
use DreamsArk\Jobs\Project\Stages\Synapse\CreateSynapseJob;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Project\Expenditures\Enroller;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Models\User\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CreateProjectCompleteCycleTest extends TestCase
{
    use DatabaseTransactions;
    private $project;

    /**
     * This is TestCase for Create Project With Complete Cycle Till Funding Stage enabled.
     *
     * @test
     */
    public function it_creates_complete_cycle_of_project()
    {
        $this->createProjectEvent(User::find(2));

        $this->assertEquals(Fund::class, get_class($this->project->stage), 'Project Not in Fund Stage');

        $this->assertTrue(true);
    }

    protected function createProjectEvent($user = '')
    {

        if (!$user instanceof User)
            $user = User::all()->random();

        /**
         * Create Project in Idea Stage
         */
        $fields = array(
            'name'    => 'My Supper Project',
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
            'content' => 'Now i will become a Synapse',
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
        dispatch(new PublishProjectReviewJob($review));

        $project = Project::find($projectId);
        /**
         * Back The Project
         */
        collect(range(1, 20))->each(function () use ($project) {
            dispatch(new BackProjectJob($project, User::all()->random(), rand(1, 5000)));
        });

        /**
         * Enroll to Project
         */
        $expenditures = $project->enrollable;
        $expenditures->each(function ($expenditure) {
            dispatch(new EnrollProjectJob($expenditure, User::all()->random()));
        });

        /**
         * Process Project
         */
        $project = Project::find($projectId);
        dispatch(new OpenVotingCommand($project->stage->vote));

        $enrollers = Enroller::all();
        $enrollers->each(function ($enroller) {
            dispatch(new VoteOnEnrollablePositionCommand($enroller, User::all()->random()));
        });

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
            dispatch(new SubmitCommand($project, $user, $fields));
        });

        /**
         * Open project Voting
         */
        dispatch(new OpenVotingCommand($vote));

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
        dispatch(new CloseVotingCommand($vote));

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
                'cost'        => rand(0, 5000),
                'profile_id'  => Profile::all()->random(),
                'description' => 'Super Nice Guy.'
            ],
            [
                'name'        => 'Crew ' . rand(1, 5),
                'cost'        => rand(0, 5000),
                'profile_id'  => Profile::all()->random(),
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
                'cost'        => rand(0, 2000),
                'name'        => 'Dummy expense ' . rand(0, 5),
                'description' => 'This will be very expansive'
            ],
            [
                'cost'        => rand(0, 2000),
                'name'        => 'Dummy expense ' . rand(0, 5),
                'description' => 'We need this.'
            ],
            [
                'cost'        => rand(0, 2000),
                'name'        => 'Dummy expense ' . rand(0, 5),
                'description' => 'Cheap thing.'
            ]
        ])->each(function ($expanse) use ($project) {
            dispatch(new ReviewCreateExpenseJob($project, $expanse));
        });
    }
}

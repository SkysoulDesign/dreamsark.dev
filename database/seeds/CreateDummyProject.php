<?php

use DreamsArk\Commands\Project\Stages\Voting\OpenVotingCommand;
use DreamsArk\Commands\Project\Submission\VoteOnSubmissionCommand;
use DreamsArk\Jobs\Project\Committee\Review\PublishProjectReviewJob;
use DreamsArk\Jobs\Project\Committee\Review\ReviewCreateCrewJob;
use DreamsArk\Jobs\Project\Committee\Review\ReviewCreateExpenseJob;
use DreamsArk\Jobs\Project\CreateProjectJob;
use DreamsArk\Jobs\Project\Expenditure\BackProjectJob;
use DreamsArk\Jobs\Project\Expenditure\EnrollProjectJob;
use DreamsArk\Jobs\Project\Stages\Script\CreateScriptJob;
use DreamsArk\Jobs\Project\Stages\Synapse\CreateSynapseJob;
use DreamsArk\Jobs\Project\Stages\Voting\CloseVotingJob;
use DreamsArk\Jobs\Project\Submission\SubmitJob;
use DreamsArk\Jobs\Project\VoteOnEnrollablePositionJob;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Project\Expenditures\Enroller;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Models\User\User;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;

class CreateDummyProject extends Seeder
{

    use DispatchesJobs;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        /**
         * Create Project in Idea Stage
         */
        $user = User::find(2);
        $fields = array(
            'name'    => 'My Supper Project',
            'content' => 'This is a Script',
        );
        $reward = ['idea' => 5];


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
            'reward'  => '10'
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
            'reward'  => '15'
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
            dispatch(new BackProjectJob($project, User::all()->random(), rand(1, 5)));
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
        dispatch(new OpenVotingCommand(Project::first()->stage->vote));

        $enrollers = Enroller::all();
        $enrollers->each(function ($enroller) {
            dispatch(new VoteOnEnrollablePositionJob($enroller, User::all()->random()));
        });

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
            $this->dispatch(new SubmitJob($project, $user, $fields));
        });

        /**
         * Open project Voting
         */
        $this->dispatch(new OpenVotingCommand($vote));

        /**
         * Vote on Some Submissions
         */
        $submissions = Submission::all();

        collect(range(1, 10))->each(function () use ($submissions, $user) {
            $this->dispatch(new VoteOnSubmissionCommand(rand(1, 50), $submissions->random(), $user));
        });

        /**
         * Close the Voting
         */
        $this->dispatch(new CloseVotingJob($vote));

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
            $this->dispatch(new ReviewCreateCrewJob($project, $crew));
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
            $this->dispatch(new ReviewCreateExpenseJob($project, $expanse));
        });
    }

}

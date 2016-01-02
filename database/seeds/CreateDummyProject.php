<?php

use DreamsArk\Commands\Committee\Project\PublishProjectCommand;
use DreamsArk\Commands\Project\CreateProjectCommand;
use DreamsArk\Commands\Project\Expenditure\BackProjectCommand;
use DreamsArk\Commands\Project\Expenditure\EnrollProjectCommand;
use DreamsArk\Commands\Project\Review\ReviewCreateCast;
use DreamsArk\Commands\Project\Review\ReviewCreateCrew;
use DreamsArk\Commands\Project\Review\ReviewCreateExpense;
use DreamsArk\Commands\Project\Stages\Script\CreateScriptCommand;
use DreamsArk\Commands\Project\Stages\Synapse\CreateSynapseCommand;
use DreamsArk\Commands\Project\Stages\Voting\CloseVotingCommand;
use DreamsArk\Commands\Project\Stages\Voting\OpenVotingCommand;
use DreamsArk\Commands\Project\Submission\SubmitCommand;
use DreamsArk\Commands\Project\Submission\VoteOnSubmissionCommand;
use DreamsArk\Commands\Project\VoteOnEnrollablePositionCommand;
use DreamsArk\Models\Project\Expenditures\Enroller;
use DreamsArk\Models\Project\Expenditures\Position;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Review;
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
            'type'    => 'idea',
            'name'    => 'My Supper Project',
            'content' => 'This is a Script',
            'reward'  => '5'
        );

        $this->dispatch(new CreateProjectCommand($user, $fields));

        /**
         * Get Project
         */
        $project = Project::first();

        /**
         * Process
         */
        $this->openNextStage($project, $user, $project->stage->vote);

        /**
         * Start Synapse Stage
         */
        $fields = array(
            'content' => 'Now i will become a Synapse',
            'reward'  => '15'
        );
        $this->dispatch(new CreateSynapseCommand($project->id, $fields));

        /**
         * Get Project
         */
        $project = Project::first();

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
        $this->dispatch(new CreateScriptCommand($project->id, $fields));

        /**
         * Get Project
         */
        $project = Project::first();

        /**
         * Process
         */
        $this->openNextStage($project, $user, $project->stage->vote);

        /**
         * Add Cast
         */
        $this->addCast($project);

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
        $review = Review::first();
        $this->dispatch(new PublishProjectCommand($review));

        /**
         * Back The Project
         */
        collect(range(1, 20))->each(function () use ($project) {
            $this->dispatch(new BackProjectCommand($project, User::all()->random(), rand(1, 5000)));
        });

        /**
         * Enroll to Project
         */
        $expenditures = $project->enrollable;
        $expenditures->each(function ($expenditure) {
            $this->dispatch(new EnrollProjectCommand($expenditure, User::all()->random()));
        });

        /**
         * Process Project
         */
        $this->dispatch(new OpenVotingCommand(Project::first()->stage->vote));

        $enrollers = Enroller::all();
        $enrollers->each(function ($enroller) {
            $this->dispatch(new VoteOnEnrollablePositionCommand($enroller, User::all()->random()));
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
            $this->dispatch(new SubmitCommand($project, $user, $fields));
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
        $this->dispatch(new CloseVotingCommand($vote));

    }

    /**
     * Add Cast
     * @param Project $project
     */
    public function addCast(Project $project)
    {
        collect([
            [
                'name'        => 'Xiao Wang',
                'cost'        => rand(0, 10000),
                'position'    => Position::all()->load('type')->where('type.name', 'cast')->random(),
                'description' => 'The Guy Who Will Appear On The Camera'
            ],
            [
                'name'        => 'Little Bear',
                'cost'        => rand(0, 10000),
                'position'    => Position::all()->load('type')->where('type.name', 'cast')->random(),
                'description' => 'The Main Actor'
            ],
            [
                'name'        => 'Julio',
                'cost'        => rand(0, 10000),
                'position'    => Position::all()->load('type')->where('type.name', 'cast')->random(),
                'description' => 'The King in the series'
            ]
        ])->each(function ($cast) use ($project) {
            $this->dispatch(new ReviewCreateCast($project, $cast));
        });
    }

    /**
     * Add Crew
     * @param Project $project
     */
    public function addCrew(Project $project)
    {
        collect([
            [
                'cost'        => rand(0, 5000),
                'position'    => Position::all()->load('type')->where('type.name', 'crew')->random(),
                'description' => 'Super Nice Guy.'
            ],
            [
                'cost'        => rand(0, 5000),
                'position'    => Position::all()->load('type')->where('type.name', 'crew')->random(),
                'description' => 'He will do everything.'
            ]
        ])->each(function ($crew) use ($project) {
            $this->dispatch(new ReviewCreateCrew($project, $crew));
        });
    }

    /**
     * Add Expense
     * @param Project $project
     */
    public function addExpense(Project $project)
    {
        collect([
            [
                'cost'        => rand(0, 2000),
                'position'    => Position::all()->load('type')->where('type.name', 'expense')->random(),
                'description' => 'This will be very expansive'
            ],
            [
                'cost'        => rand(0, 2000),
                'position'    => Position::all()->load('type')->where('type.name', 'expense')->random(),
                'description' => 'We need this.'
            ],
            [
                'cost'        => rand(0, 2000),
                'position'    => Position::all()->load('type')->where('type.name', 'expense')->random(),
                'description' => 'Cheap thing.'
            ]
        ])->each(function ($expanse) use ($project) {
            $this->dispatch(new ReviewCreateExpense($project, $expanse));
        });
    }

}

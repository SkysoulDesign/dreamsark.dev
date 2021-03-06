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
use DreamsArk\Jobs\Project\Submission\CreateSubmissionJob;
use DreamsArk\Jobs\Project\VoteOnEnrollablePositionJob;
use DreamsArk\Jobs\User\Profile\CreateProfileJob;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Review;
use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Models\User\User;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;

/**
 * Class CreateDummyProject
 */
class CreateDummyProject extends Seeder
{

    use DispatchesJobs, UserTrait;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $stagesArr = ['idea', 'synapse', 'script', 'fund', 'distribute'];
        for($i=0; $i<=32; $i++) {
            $result = $this->createProject(array_rand($stagesArr));
            sleep(1);
        }

    }

    protected function createProject($endStage = '')
    {
        /**
         * Create Project in Idea Stage
         */
//        $user = $this->createUser();// User::find(2);
        $user = User::all()->random(1);
        $faker = app(\Faker\Generator::class);
        $projectName = $faker->realText(20) . ' - ' . $faker->monthName;
        $fields = array(
            'name'    => $projectName,
            'content' => 'This is an Idea',
        );
        $reward = ['idea' => 5];


        /** @var Project $project */
        $project = dispatch(new CreateProjectJob($user, $fields, $reward));
        $projectId = $project->id;

        if ($endStage == 'idea')
            return $endStage;
        /**
         * Get Project
         */
        $project = Project::find($projectId);

        /**
         * Process
         */
        $this->openNextStage($project, $user, $project->stage->vote);
        sleep(1);

        /**
         * Start Synapse Stage
         */
        $fields = array(
            'content' => 'Now i will become a Synapse',
            'reward'  => '10'
        );
        dispatch(new CreateSynapseJob($project->id, $fields));

        if ($endStage == 'synapse')
            return $endStage;
        /**
         * Get Project
         */
        $project = Project::find($projectId);

        /**
         * Process
         */
        $this->openNextStage($project, $user, $project->stage->vote);
        sleep(1);

        /**
         * Start Script Stage
         */
        $fields = array(
            'content' => 'Now i will become a Synapse',
            'reward'  => '15'
        );
        dispatch(new CreateScriptJob($project->id, $fields));

        if ($endStage == 'script')
            return $endStage;
        /**
         * Get Project
         */
        $project = Project::find($projectId);

        /**
         * Process
         */
        $this->openNextStage($project, $user, $project->stage->vote);
        sleep(1);

        /**
         * Add Crew
         */
        $this->addCrew($project);

        /**
         * Add Expenses
         */
        $this->addExpense($project);

        if (in_array($endStage, ['fund', 'distribute'])) {

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
                dispatch(new BackProjectJob($project, User::all()->random(), rand(1, 10)));
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
                $users = User::all()->random(2);
                foreach ($users as $user) {
                    if (!$user->hasProfile($profile)) {
                        $answers = [];
                        foreach ($profile->questions as $question) {
                            array_set($answers, "question_$question->id", $faker->realText(rand(20, 30)));
                        }
                        /** @var User $user */
                        $user = dispatch(new CreateProfileJob($answers, $user, $profile->fresh()));
                    }
                    dispatch(new EnrollProjectJob($expenditure, $user));
                }
            });

            /**
             * Process Project
             */
            dispatch(new OpenVotingJob(Project::find($projectId)->stage->vote));

            if ($endStage == 'distribute')
                $this->doVotingOnEnrollAndClose($projectId);
        }
    }

    protected function doVotingOnEnrollAndClose($projectId)
    {
        $project = Project::find($projectId)->load('enrollable');
        $amount = 0;
        foreach ($project->enrollable as $expenditure) {
            if (!$expenditure->enrollers->isEmpty()) {
                foreach ($expenditure->enrollers as $enroller) {
                    $enrollVote = rand(1, 100);
                    $amount += $enrollVote;
                    dispatch(new VoteOnEnrollablePositionJob($enroller, User::all()->random(), $enrollVote));
                }
            }
        }

        /**
         * Close the Voting
         */
        sleep(2);
        dispatch(new CloseVotingJob($project->stage->vote->id));

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

        collect(range(1, 6))->each(function () use ($project, $user, $fields) {
            $this->dispatch(new CreateSubmissionJob($project, User::all()->random(), $fields));
        });

        /**
         * Open project Voting
         */
        $this->dispatch(new OpenVotingJob($vote));

        /**
         * Vote on Some Submissions
         */
        $submissions = Submission::all();

        collect(range(1, 6))->each(function () use ($submissions, $user) {
            $this->dispatch(new VoteOnSubmissionCommand(rand(1, 50), $submissions->random(), User::all()->random()));
        });

        /**
         * Close the Voting
         */
        $this->dispatch(new CloseVotingJob($vote->id));

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
                'cost'        => rand(1, 1000),
                'profile_id'  => Profile::all()->random(),
                'description' => 'Super Nice Guy.'
            ],
            [
                'name'        => 'Crew ' . rand(1, 5),
                'cost'        => rand(1, 1000),
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
                'cost'        => rand(1, 500),
                'name'        => 'Dummy expense ' . rand(1, 5),
                'description' => 'This will be very expansive'
            ],
            [
                'cost'        => rand(1, 500),
                'name'        => 'Dummy expense ' . rand(1, 5),
                'description' => 'We need this.'
            ],
            [
                'cost'        => rand(1, 500),
                'name'        => 'Dummy expense ' . rand(1, 5),
                'description' => 'Cheap thing.'
            ]
        ])->each(function ($expanse) use ($project) {
            $this->dispatch(new ReviewCreateExpenseJob($project, $expanse));
        });
    }

}

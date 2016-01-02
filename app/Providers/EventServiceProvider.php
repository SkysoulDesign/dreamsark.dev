<?PHP

namespace DreamsArk\Providers;

use DreamsArk\Events\Bag\UserCoinsWasDeducted;
use DreamsArk\Events\Committee\Project\FundWasCreated;
use DreamsArk\Events\Idea\IdeaWasSubmitted;
use DreamsArk\Events\Idea\UserHasBiddenAnIdea;
use DreamsArk\Events\Position\ExpenditurePositionWasCreated;
use DreamsArk\Events\Project\CastWasAdded;
use DreamsArk\Events\Project\CrewWasAdded;
use DreamsArk\Events\Project\IdeaWasCreated;
use DreamsArk\Events\Project\ProjectWasBacked;
use DreamsArk\Events\Project\ProjectWasCreated;
use DreamsArk\Events\Project\Script\ScriptWasCreated;
use DreamsArk\Events\Project\StageHasFailed;
use DreamsArk\Events\Project\Stages\ReviewWasCreated;
use DreamsArk\Events\Project\Submission\SubmissionReceivedAVote;
use DreamsArk\Events\Project\Synapse\SynapseWasCreated;
use DreamsArk\Events\Project\UserHasEnrolledToCast;
use DreamsArk\Events\Project\Vote\VoteWasCreated;
use DreamsArk\Events\Project\Vote\VoteWasOpened;
use DreamsArk\Events\Project\Vote\VotingHasFailed;
use DreamsArk\Events\Project\Vote\VotingHasFinished;
use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Events\Session\UserWasUpdated;
use DreamsArk\Events\Translation\TranslationsWasCreated;
use DreamsArk\Listeners\Project\ChargeUser;
use DreamsArk\Listeners\Project\CreateProjectStage;
use DreamsArk\Listeners\Project\CreateVote;
use DreamsArk\Listeners\Project\DeductUserCoins;
use DreamsArk\Listeners\Project\RefundCreator;
use DreamsArk\Listeners\Project\RefundUsers;
use DreamsArk\Listeners\Project\RegisterVotingWinner;
use DreamsArk\Listeners\Project\UpdateProjectStage;
use DreamsArk\Listeners\Project\Vote\AutomaticallySendReviewToCommittee;
use DreamsArk\Listeners\Project\Vote\DeactivateVoting;
use DreamsArk\Listeners\Project\Vote\QueueCloseVotingCommand;
use DreamsArk\Listeners\Project\Vote\QueueOpenVotingCommand;
use DreamsArk\Listeners\User\AppendDefaultSettings;
use DreamsArk\Listeners\User\AttachUserRole;
use DreamsArk\Listeners\User\GiveUserAnEmptyBag;
use DreamsArk\Listeners\User\LogUserIn;
use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [

        /**
         * Project
         */
        ProjectWasCreated::class => [
            CreateProjectStage::class
        ],

        StageHasFailed::class => [
            RefundCreator::class
        ],

        IdeaWasCreated::class => [
            ChargeUser::class,
            CreateVote::class,
            UpdateProjectStage::class
        ],

        SynapseWasCreated::class => [
            ChargeUser::class,
            CreateVote::class,
            UpdateProjectStage::class
        ],

        ScriptWasCreated::class => [
            ChargeUser::class,
            CreateVote::class,
            UpdateProjectStage::class
        ],

        FundWasCreated::class => [
            UpdateProjectStage::class,
            CreateVote::class,
        ],

        ProjectWasBacked::class => [
            DeductUserCoins::class
        ],

        /**
         * Vote
         */
        VoteWasCreated::class   => [
            QueueOpenVotingCommand::class
        ],

        VoteWasOpened::class => [
            QueueCloseVotingCommand::class
        ],

        VotingHasFailed::class => [
            DeactivateVoting::class,
        ],

        VotingHasFinished::class => [
            DeactivateVoting::class,
            RefundUsers::class,
            RegisterVotingWinner::class,
            AutomaticallySendReviewToCommittee::class,
        ],

        UserWasCreated::class => [
            AppendDefaultSettings::class,
            GiveUserAnEmptyBag::class,
            AttachUserRole::class,
            LogUserIn::class,
        ],

        ReviewWasCreated::class => [
            UpdateProjectStage::class
        ],

        SubmissionReceivedAVote::class => [
            DeductUserCoins::class
        ],

        UserWasUpdated::class => [],

        IdeaWasSubmitted::class    => [],
        UserHasBiddenAnIdea::class => [],

        CastWasAdded::class                  => [],
        CrewWasAdded::class                  => [],
        UserHasEnrolledToCast::class         => [],
        TranslationsWasCreated::class        => [],
        UserCoinsWasDeducted::class          => [],
        ExpenditurePositionWasCreated::class => [],


    ];

    /**
     * Register any other events for your application.
     *
     * @param  \Illuminate\Contracts\Events\Dispatcher $events
     * @return void
     */
    public function boot(DispatcherContract $events)
    {
        parent::boot($events);
    }

}

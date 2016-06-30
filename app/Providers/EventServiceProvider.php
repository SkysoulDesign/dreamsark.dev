<?PHP

namespace DreamsArk\Providers;

use DreamsArk\Events\Admin\Question\QuestionWasCreated;
use DreamsArk\Events\Admin\Question\QuestionWasUpdated;
use DreamsArk\Events\Bag\UserCoinsWasDeducted;
use DreamsArk\Events\Committee\Project\FundWasCreated;
use DreamsArk\Events\Idea\IdeaWasSubmitted;
use DreamsArk\Events\Idea\UserHasBiddenAnIdea;
use DreamsArk\Events\Payment\PaymentWasCanceled;
use DreamsArk\Events\Payment\PaymentWasConfirmed;
use DreamsArk\Events\Position\ExpenditurePositionWasCreated;
use DreamsArk\Events\Project\CastWasAdded;
use DreamsArk\Events\Project\CrewWasAdded;
use DreamsArk\Events\Project\Fund\EnrollerReceivedVote;
use DreamsArk\Events\Project\IdeaWasCreated;
use DreamsArk\Events\Project\ProjectWasBacked;
use DreamsArk\Events\Project\ProjectWasCompleted;
use DreamsArk\Events\Project\ProjectWasCreated;
use DreamsArk\Events\Project\RewardStageWasUpdated;
use DreamsArk\Events\Project\Script\ScriptWasCreated;
use DreamsArk\Events\Project\StageHasFailed;
use DreamsArk\Events\Project\Stages\DistributionWasCreated;
use DreamsArk\Events\Project\Stages\ReviewWasCreated;
use DreamsArk\Events\Project\Submission\SubmissionReceivedAVote;
use DreamsArk\Events\Project\Synapse\SynapseWasCreated;
use DreamsArk\Events\Project\UserHasEnrolledToCast;
use DreamsArk\Events\Project\Vote\Enroll\WinnerHasAssignedToCrew;
use DreamsArk\Events\Project\Vote\EnrollVotingHasFinished;
use DreamsArk\Events\Project\Vote\VoteWasCreated;
use DreamsArk\Events\Project\Vote\VoteWasOpened;
use DreamsArk\Events\Project\Vote\VotingHasFailed;
use DreamsArk\Events\Project\Vote\VotingHasFinished;
use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Events\Session\UserWasUpdated;
use DreamsArk\Events\Translation\TranslationsWasCreated;
use DreamsArk\Events\User\Profile\UserProfileWasCreated;
use DreamsArk\Events\User\Profile\UserProfileWasUpdated;
use DreamsArk\Listeners\Admin\Question\SyncOptions;
use DreamsArk\Listeners\Project\ChargeRewardFromUser;
use DreamsArk\Listeners\Project\ChargeUser;
use DreamsArk\Listeners\Project\CreateProjectStage;
use DreamsArk\Listeners\Project\CreateVote;
use DreamsArk\Listeners\Project\DeductUserCoins;
use DreamsArk\Listeners\Project\RefundCreator;
use DreamsArk\Listeners\Project\RefundUsers;
use DreamsArk\Listeners\Project\RegisterVotingWinner;
use DreamsArk\Listeners\Project\UpdateProjectStage;
use DreamsArk\Listeners\Project\UpdateRewardForStage;
use DreamsArk\Listeners\Project\Vote\AutomaticallySendReviewToCommittee;
use DreamsArk\Listeners\Project\Vote\DeactivateVoting;
use DreamsArk\Listeners\Project\Vote\QueueCloseVotingCommand;
use DreamsArk\Listeners\Project\Vote\QueueOpenVotingCommand;
use DreamsArk\Listeners\Project\Vote\SendProjectToDistributionReview;
use DreamsArk\Listeners\User\AppendDefaultSettings;
use DreamsArk\Listeners\User\AttachUserRole;
use DreamsArk\Listeners\User\GiveUserAnEmptyBag;
use DreamsArk\Listeners\User\LogUserIn;
use DreamsArk\Listeners\User\Payment\AddCoinsToUser;
use DreamsArk\Listeners\User\Payment\DeductCoinsFromUser;
use DreamsArk\Listeners\User\Payment\UpdateOrCreateTransactionMessage;
use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use SocialiteProviders\Manager\SocialiteWasCalled;

/**
 * Class EventServiceProvider
 *
 * @package DreamsArk\Providers
 */
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
            ChargeRewardFromUser::class,
            CreateProjectStage::class
        ],

        StageHasFailed::class => [
            RefundCreator::class
        ],

        IdeaWasCreated::class => [
            UpdateRewardForStage::class,
            CreateVote::class,
            UpdateProjectStage::class
        ],

        SynapseWasCreated::class => [
            UpdateRewardForStage::class,
            CreateVote::class,
            UpdateProjectStage::class
        ],

        ScriptWasCreated::class => [
            UpdateRewardForStage::class,
            CreateVote::class,
            UpdateProjectStage::class
        ],

        RewardStageWasUpdated::class => [
            ChargeUser::class,
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
        VoteWasCreated::class => [
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

        EnrollVotingHasFinished::class => [
            DeactivateVoting::class,
            SendProjectToDistributionReview::class
        ],

        WinnerHasAssignedToCrew::class => [
        ],

        DistributionWasCreated::class => [
            UpdateProjectStage::class,
        ],

        ReviewWasCreated::class => [
            UpdateProjectStage::class
        ],

        SubmissionReceivedAVote::class => [
            DeductUserCoins::class
        ],

        EnrollerReceivedVote::class => [
            DeductUserCoins::class
        ],

        ProjectWasCompleted::class => [
        ],

        /**
         * User Create Job
         */
        UserWasCreated::class => [
            AppendDefaultSettings::class,
            GiveUserAnEmptyBag::class,
            AttachUserRole::class,
            LogUserIn::class,
        ],

        UserWasUpdated::class => [
            AttachUserRole::class
        ],

        IdeaWasSubmitted::class => [],
        UserHasBiddenAnIdea::class => [],

        CastWasAdded::class => [],
        CrewWasAdded::class => [],
        UserHasEnrolledToCast::class => [],
        TranslationsWasCreated::class => [],
        UserCoinsWasDeducted::class => [],
        ExpenditurePositionWasCreated::class => [],

        /** User Profiles related */
        UserProfileWasCreated::class => [],
        UserProfileWasUpdated::class => [],


        /**
         * Questions
         */
        QuestionWasCreated::class => [
            SyncOptions::class
        ],

        QuestionWasUpdated::class => [
            SyncOptions::class
        ],

        PaymentWasConfirmed::class => [
            AddCoinsToUser::class,
            DeductCoinsFromUser::class,
            UpdateOrCreateTransactionMessage::class
        ],

        PaymentWasCanceled::class => [
            UpdateOrCreateTransactionMessage::class
        ],

        SocialiteWasCalled::class => [
            // add your listeners (aka providers) here
            'SkysoulDesign\Socialite\ExtendSocialiteProvider@handle'
            /*'SocialiteProviders\Weixin\WeixinExtendSocialite@handle',
            'SocialiteProviders\Qq\QqExtendSocialite@handle',
            'SocialiteProviders\Weibo\WeiboExtendSocialite@handle',*/
        ],

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

<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use DreamsArk\Http\Controllers\Admin\AdminController;
use DreamsArk\Http\Controllers\Admin\Payment\TransactionController;
use DreamsArk\Http\Controllers\Admin\Profile\ProfileController as AdminProfileController;
use DreamsArk\Http\Controllers\Admin\Project\ProjectController as AdminProjectController;
use DreamsArk\Http\Controllers\Admin\Question\QuestionController;
use DreamsArk\Http\Controllers\Admin\User\UserController;
use DreamsArk\Http\Controllers\Auth\AuthController;
use DreamsArk\Http\Controllers\Committee\CommitteeController;
use DreamsArk\Http\Controllers\Committee\Project\CastController;
use DreamsArk\Http\Controllers\Committee\Project\CrewController;
use DreamsArk\Http\Controllers\Committee\Project\ExpenditureController;
use DreamsArk\Http\Controllers\Committee\Project\ExpenseController;
use DreamsArk\Http\Controllers\Committee\Project\StaffController;
use DreamsArk\Http\Controllers\Dashboard\DashboardController;
use DreamsArk\Http\Controllers\Home\HomeController;
use DreamsArk\Http\Controllers\Payment\PaymentController;
use DreamsArk\Http\Controllers\Project\CommentController;
use DreamsArk\Http\Controllers\Project\EnrollController;
use DreamsArk\Http\Controllers\Project\FundController;
use DreamsArk\Http\Controllers\Project\Idea\SubmissionController as SubmissionIdeaController;
use DreamsArk\Http\Controllers\Project\ProjectController;
use DreamsArk\Http\Controllers\Project\Script\ScriptController;
use DreamsArk\Http\Controllers\Project\SubmissionController;
use DreamsArk\Http\Controllers\Project\Synapse\SynapseController;
use DreamsArk\Http\Controllers\Project\VoteController;
use DreamsArk\Http\Controllers\PublicData\ProfileController as PublicProfileController;
use DreamsArk\Http\Controllers\Report\ReportController;
use DreamsArk\Http\Controllers\Session\SessionController;
use DreamsArk\Http\Controllers\User\Application\ActorController;
use DreamsArk\Http\Controllers\User\Bag\CoinController;
use DreamsArk\Http\Controllers\User\ProfileController;
use DreamsArk\Http\Controllers\User\ProjectController as UserProjectController;
use DreamsArk\Http\Controllers\User\PurchaseController;
use DreamsArk\Http\Controllers\User\Setting\SettingController;
use DreamsArk\Jobs\Project\Stages\Voting\CloseVotingJob;
use DreamsArk\Models\Project\Stages\Vote;

$app->get('test', function () {

    $vote = Vote::find(3);
    dd(dispatch(new CloseVotingJob($vote)));

});

$app->get('info', function () {
    phpinfo();
});

$app->get('kitchen-sink/{section?}', function ($section) {
    return view('kitchen-sink.index', compact('section'));
})->name('kitchen-sink')->middleware('web');

/** @var $app \Illuminate\Routing\Router */
$app->group(['middleware' => 'web'], function () use ($app) {

    /**
     * Home Controller
     */
    $app->get('/', HomeController::class . '@index')->name('home');

    /**
     * Switch Language
     */
    $app->get('change-language/{lang}', HomeController::class . '@changeLanguage')->name('language');

    /**
     * Dashboard Controller
     */
    $app->get('dashboard', DashboardController::class . '@index')->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | Auth: Login & Registration Routes
    |--------------------------------------------------------------------------
    */
    $app->get('login', AuthController::class . '@login')->name('login');
    $app->post('login/store', AuthController::class . '@loginStore')->name('login.store');
    $app->get('register', AuthController::class . '@register')->name('register');
    $app->post('register/store', AuthController::class . '@registerStore')->name('register.store');
    $app->get('logout', AuthController::class . '@logout')->name('logout');

    /**
     * Mobile
     */
    $app->group(['prefix' => 'mobile', 'as' => 'mobile.'], function () use ($app) {
        $app->post('register', SessionController::class . '@storeMobile')->name('register.store');
        $app->post('sendVerify', SessionController::class . '@sendVerificationCode')->name('send.verify');
    });

    /**
     * Social
     */
    $app->group(['prefix' => 'login/social', 'as' => 'login.social.'], function () use ($app) {
        $app->post('/', AuthController::class . '@loginWithSocial')->name('post');
        $app->get('{social}/status', AuthController::class . '@loginWithSocialCallBack')->name('callback');
    });

    /*
    |--------------------------------------------------------------------------
    | Project Routes
    |--------------------------------------------------------------------------
    */
    $app->group(['prefix' => 'project', 'as' => 'project.'], function () use ($app) {

        $app->get('/', ProjectController::class . '@index')->name('index');
        $app->get('show/{project}', ProjectController::class . '@show')->name('show');

        /**
         * Project Idea Routes
         */
        $app->group(['prefix' => '{project}/idea', 'as' => 'idea.'], function () use ($app) {

            /**
             * Submission Controller
             */
            $app->group(['prefix' => 'submission', 'as' => 'submission.'], function () use ($app) {
                $app->post('store', SubmissionController::class . '@store')->name('store');
                $app->patch('{submission}/update', SubmissionController::class . '@update')->name('update');
                $app->post('{submission}/vote/store', SubmissionIdeaController::class . '@vote')->name('vote.store');
            });

        });

        /**
         * Temporarily
         */
        $app->post('comments/{project}/{commentable_type}', CommentController::class . '@store')->name('comment.store');

        /**
         * Vote Controller
         */
        $app->group(['prefix' => '{project}/vote', 'as' => 'vote.'], function () use ($app) {
            $app->get('/', VoteController::class . '@index')->name('index');
            $app->get('show/{vote}', VoteController::class . '@show')->name('show');
            $app->get('create', VoteController::class . '@create')->name('create');
        });

    });

    /*
    |--------------------------------------------------------------------------
    | User Routes
    |--------------------------------------------------------------------------
    |
    | Here is listed all routes prefixed with user.
    |
    */
    $app->group(['prefix' => 'user', 'as' => 'user.', 'middleware' => 'auth'], function () use ($app) {

        /**
         * Session Controller
         */
        $app->get('account', SessionController::class . '@index')->name('account');
        $app->patch('account/update', SessionController::class . '@update')->name('account.update');

        /**
         * Purchases
         */
        $app->group(['prefix' => 'purchases', 'as' => 'purchase.'], function () use ($app) {

            $app->get('/', PurchaseController::class . '@index')->name('index');

            /**
             * Coin Controller
             */
            $app->group(['prefix' => 'coins', 'as' => 'coin.'], function () use ($app) {
//                $app->get('add', CoinController::class . '@create')->name('create');
                $app->post('store', CoinController::class . '@store')->name('store');
                $app->post('withdraw', CoinController::class . '@withdrawCoins')->name('withdraw');
            });

        });

        /**
         * Settings Controller
         */
        $app->get('settings', SettingController::class . '@index')->name('settings');
        $app->patch('settings/update', SettingController::class . '@update')->name('settings.update');

        /**
         * Project Controller
         */
        $app->group(['prefix' => 'project', 'as' => 'project.'], function () use ($app) {

            $app->get('/', UserProjectController::class . '@index')->name('index');
            $app->get('create', UserProjectController::class . '@create')->name('create');
            $app->post('store', UserProjectController::class . '@store')->name('store');
            $app->get('edit/{project}', UserProjectController::class . '@edit')->name('edit');
            $app->patch('update/{project}', UserProjectController::class . '@update')->name('update');

            $app->get('show/{project}/iframe', ProjectController::class . '@showIframe')->name('show.iframe');
            $app->get('{project}/next/create', ProjectController::class . '@next')->name('next.create');
            $app->post('{project}/store', ProjectController::class . '@projectStore')->name('project.store');

//            $app->get('publish/{draft}', ProjectController::class . '@publish')->name('publish');
            /**
             * Project Synapse Controller
             */
            $app->get('synapse/show/{project}', SynapseController::class . '@show')->name('synapse.show');
            $app->post('synapse/store/{project}', SynapseController::class . '@store')->name('synapse.store');
            $app->post('script/store/{project}', ScriptController::class . '@store')->name('script.store');
            /**
             * Project Script Controller
             */
//        $app->post('script/store/{project}', ScriptController::class . '@store')->name('script.store');
            $app->get('script/show/{project}', ScriptController::class . '@show')->name('script.show');

            /**
             * Enroll Controller
             */
            $app->get('{project}/enroll/create', EnrollController::class . '@create')->name('enroll.create');
            $app->post('enroll/store/{expenditure}', EnrollController::class . '@store')->name('enroll.store');
            $app->post('unroll/store/{expenditure}', EnrollController::class . '@unroll')->name('unroll.store');

            /**
             * Fund Controller
             */
            $app->group(['middleware' => ['auth',], 'prefix' => 'fund', 'as' => 'fund.'], function () use ($app) {
                $app->get('create/{project}', FundController::class . '@create')->name('create');
                $app->post('store/{project}', FundController::class . '@store')->name('store');
                $app->post('vote/store/{enroller}', FundController::class . '@vote')->name('vote.store');
            });

            /**
             * Project Take Controller
             */
//        $app->post('take/store/{script}', TakeController::class . '@store')->name('take.store');

            /**
             * Project Pledge Controller
             */
//        $app->get('pledge/create/{project}', ProjectPledgeController::class . '@create')->name('pledge.create');
//        $app->post('pledge/store/{project}', ProjectPledgeController::class . '@store')->name('pledge.store');
        });

        /**
         * Profile Controller
         */
        $app->group(['prefix' => 'profile', 'as' => 'profile.'], function () use ($app) {

            $app->get('/', ProfileController::class . '@index')->name('index');
            $app->get('create', ProfileController::class . '@create')->name('create');
            $app->post('store', ProfileController::class . '@store')->name('store');
            $app->get('{profile}/edit', ProfileController::class . '@edit')->name('edit');
            $app->patch('{profile}/update', ProfileController::class . '@update')->name('update');
            $app->get('{profile}/show', ProfileController::class . '@show')->name('show');
            $app->get('getFields', ProfileController::class . '@fields')->name('fields');

            /**
             * Test.. what is this?
             */
//            $app->get('{profile}/as', ProfileController::class . '@as')->name('public');
        });

        /** User's Project Related Actions List */
        $app->group(['prefix' => 'activity', 'as' => 'activity.'], function () use ($app) {
            $app->get('backer/list', UserProjectController::class . '@backerList')->name('backed.list');
            $app->get('enroll/list', UserProjectController::class . '@enrolledList')->name('enrolled.list');
            $app->get('earnings', ProfileController::class . '@userEarningHistory')->name('earning');
        });

    });

    /*
    |--------------------------------------------------------------------------
    | Committee Routes
    |--------------------------------------------------------------------------
    |
    | Here is listed all routes prefixed with committee.
    |
    */
    $app->group(['middleware' => ['auth', 'can:see-committee-section'], 'prefix' => 'committee', 'as' => 'committee.'], function () use ($app) {

        $app->get('/', CommitteeController::class . '@index')->name('index');


        /**
         * Project Controller
         */
        $app->group(['prefix' => 'project', 'as' => 'project.'], function () use ($app) {

            $app->get('review', CommitteeController::class . '@projectsInReviewStage')->name('review.index');
            $app->get('fund', CommitteeController::class . '@projectsInFundStage')->name('fund.index');
            $app->get('distribution', CommitteeController::class . '@projectsInDistributionStage')->name('distribution.index');

            $app->post('{project}/expense/store', ExpenseController::class . '@store')->name('expense.store');
            $app->post('{project}/crew/store', CrewController::class . '@store')->name('crew.store');

        });

        /**
         * Committee Staff Controller
         */
        $app->get('project-planning/{review}/manage', StaffController::class . '@create')->name('project.planning.manage');

        $app->post('create/staff/{project}', StaffController::class . '@store')->name('project.staff.store');
        $app->post('project/cast/store/{project}', CastController::class . '@store')->name('project.cast.store');
        $app->post('project/expense/destroy/{expenditure}', ExpenditureController::class . '@destroy')->name('project.expenditure.destroy');
        $app->post('project/publish/{review}', StaffController::class . '@publish')->name('project.publish');
        /**
         * Project Cast Controller
         */
        $app->post('cast/store/{project}', CastController::class . '@store')->name('cast.store');
        /**
         * Project Crew Controller
         */
        $app->post('crew/store/{project}', CrewController::class . '@store')->name('crew.store');

        $app->group(['prefix' => 'project', 'as' => 'project.'], function () use ($app) {
            $app->group(['prefix' => 'fund', 'as' => 'fund.'], function () use ($app) {

                $app->get('{fund}/view', CommitteeController::class . '@ViewFundProcess')->name('view');
            });

            $app->group(['prefix' => 'distribution', 'as' => 'distribute.'], function () use ($app) {

                $app->get('{distribution}/view', CommitteeController::class . '@ViewDistributeProcess')->name('view');
            });
        });


    });

    /*
    |--------------------------------------------------------------------------
    | Admin Routes
    |--------------------------------------------------------------------------
    |
    | Here is listed all routes prefixed with admin.
    |
    */
    $app->group(['middleware' => ['auth', 'can:see-admin-section'], 'prefix' => 'admin', 'as' => 'admin.'], function () use ($app) {

        $app->get('/', AdminController::class . '@index')->name('index');

        /**
         * Profile Controller
         */
        $app->group(['prefix' => 'profile', 'as' => 'profile.'], function () use ($app) {

            $app->get('/', AdminProfileController::class . '@index')->name('index');
            $app->get('create', AdminProfileController::class . '@create')->name('create');
            $app->post('store', AdminProfileController::class . '@store')->name('store');
            $app->get('{profile}/edit', AdminProfileController::class . '@edit')->name('edit');
            $app->patch('{profile}/update', AdminProfileController::class . '@update')->name('update');
            $app->delete('{profile}/destroy', AdminProfileController::class . '@destroy')->name('destroy');

            /**
             * Questions Controller
             */
            $app->group(['prefix' => 'question', 'as' => 'question.'], function () use ($app) {
                $app->get('/', QuestionController::class . '@index')->name('index');
                $app->get('create', QuestionController::class . '@create')->name('create');
                $app->post('store', QuestionController::class . '@store')->name('store');
                $app->get('{question}/edit', QuestionController::class . '@edit')->name('edit');
                $app->patch('{question}/update', QuestionController::class . '@update')->name('update');
                $app->delete('{question}/destroy', QuestionController::class . '@destroy')->name('destroy');
            });

        });

        /**
         * Projects Controller
         */
        $app->group(['prefix' => 'project', 'as' => 'project.'], function () use ($app) {
            $app->get('/', AdminProjectController::class . '@index')->name('index');
        });


        /**
         * Users Controller
         */
        $app->group(['prefix' => 'user', 'as' => 'user.'], function () use ($app) {
            $app->get('/', UserController::class . '@index')->name('index');
            $app->get('create', UserController::class . '@create')->name('create');
            $app->post('store', UserController::class . '@store')->name('store');
            $app->get('{user}/edit', UserController::class . '@edit')->name('edit');
            $app->patch('{user}/update', UserController::class . '@update')->name('update');
            $app->delete('{user}/destroy', UserController::class . '@destroy')->name('destroy');
        });


        /**
         * Transaction Controller
         */
        $app->group(['prefix' => 'transaction', 'as' => 'transaction.'], function () use ($app) {
            $app->get('/', TransactionController::class . '@index')->name('index');
            $app->get('purchases/{trans_status}', TransactionController::class . '@getPurchaseList')->name('purchase');
            $app->get('withdrawals/{trans_status}', TransactionController::class . '@getWithdrawList')->name('withdraw');
            $app->get('update/{new_status}', TransactionController::class . '@updateAndProcess')->name('update');
        });

    });


    /**
     * Payment Related Routes
     */
    $app->get('payment/status/{result}', PaymentController::class . '@paymentStatus')->name('payment.status');
    $app->group(['prefix' => 'payment', 'as' => 'payment.', 'middleware' => 'transaction'], function () use ($app) {

        $app->get('/', PaymentController::class . '@index')->name('index');

        $app->any('{driver}/callback', PaymentController::class . '@callback')->name('callback');
        $app->any('{driver}/notify_callback', PaymentController::class . '@notify_callback')->name('notify_callback');

        $app->get('enquiry/event', PaymentController::class . '@transactionEnquiryEvent')->name('enquiry_event');
        /* $app->group(['prefix' => 'alipay', 'as' => 'alipay.'], function () use ($app) {
             $app->get('status', PaymentController::class . '@alipayStatus')->name('status');
             $app->any('notify', PaymentController::class . '@alipayNotifications')->name('notify');
         });
         $app->group(['prefix' => 'unionpay', 'as' => 'unionpay.'], function () use ($app) {
             $app->post('status', PaymentController::class . '@uPStatus')->name('status');
             $app->any('notify', PaymentController::class . '@uPNotifications')->name('notify');
         });*/

    });


    /**
     * Profile Controller
     */
//    $app->resource('user/profile', ProfileController::class, ['except' => ['destroy', 'create']]);
//    $app->get('user/profile/{profile}/create', ProfileController::class . '@create')->name('user.profile.create');
    $app->group(['prefix' => 'public', 'as' => 'public.'], function () use ($app) {
        $app->group(['prefix' => 'profile', 'as' => 'profile.'], function () use ($app) {
            $app->get('index', PublicProfileController::class . '@index')->name('index');
            $app->get('{profile}/list', PublicProfileController::class . '@usersByProfile')->name('list');
            $app->get('{profile}/{username}', PublicProfileController::class . '@showPublicProfile')->name('show');
            $app->get('iframe/{profile}/{username}', PublicProfileController::class . '@showPublicProfileIframe')->name('show.iframe');
        });
    });

    /**
     * Vote Controller
     */
    $app->get('votes', VoteController::class . '@index')->name('votes');
    $app->get('vote/show/{vote}', VoteController::class . '@show')->name('vote.show');

    /**
     * Project Controller
     */
    $app->get('projects', ProjectController::class . '@index')->name('projects');


    $app->group(['prefix' => 'project', 'as' => 'project.'], function () use ($app) {
        $app->get('create', ProjectController::class . '@create')->name('create');
        $app->get('show/{project}', ProjectController::class . '@show')->name('show');
        $app->get('show/{project}/iframe', ProjectController::class . '@showIframe')->name('show.iframe');
        $app->post('store', ProjectController::class . '@store')->name('store');
        $app->get('next/create/{project}', ProjectController::class . '@next')->name('next.create');
        $app->post('{project}/store', ProjectController::class . '@projectStore')->name('project.store');
        $app->get('edit/{draft}', ProjectController::class . '@edit')->name('edit');
        $app->post('update/{draft}', ProjectController::class . '@update')->name('update');
        $app->get('publish/{draft}', ProjectController::class . '@publish')->name('publish');
        /**
         * Project Synapse Controller
         */
        $app->get('synapse/show/{project}', SynapseController::class . '@show')->name('synapse.show');
        $app->post('synapse/store/{project}', SynapseController::class . '@store')->name('synapse.store');
        $app->post('script/store/{project}', ScriptController::class . '@store')->name('script.store');
        /**
         * Project Script Controller
         */
//        $app->post('script/store/{project}', ScriptController::class . '@store')->name('script.store');
        $app->get('script/show/{project}', ScriptController::class . '@show')->name('script.show');

        /**
         * Enroll Controller
         */
        $app->get('enroll/create/{project}', EnrollController::class . '@create')->name('enroll.create');
        $app->post('enroll/store/{expenditure}', EnrollController::class . '@store')->name('enroll.store');
        $app->post('unroll/store/{expenditure}', EnrollController::class . '@unroll')->name('unroll.store');

        /**
         * Fund Controller
         */
        $app->group(['middleware' => ['auth',], 'prefix' => 'fund', 'as' => 'fund.'], function () use ($app) {
            $app->get('create/{project}', FundController::class . '@create')->name('create');
            $app->post('store/{project}', FundController::class . '@store')->name('store');
            $app->post('vote/store/{enroller}', FundController::class . '@vote')->name('vote.store');
        });

        $app->get('{project}/setComplete', ProjectController::class . '@updateProjectAndComplete')->name('set.complete');

        /**
         * Project Take Controller
         */
//        $app->post('take/store/{script}', TakeController::class . '@store')->name('take.store');

        /**
         * Project Pledge Controller
         */
//        $app->get('pledge/create/{project}', ProjectPledgeController::class . '@create')->name('pledge.create');
//        $app->post('pledge/store/{project}', ProjectPledgeController::class . '@store')->name('pledge.store');
    });

    /**
     * User Applications
     */
    $app->get('user/application', ActorController::class . '@create')->name('user.application.actor');

    /**
     * Report Controller
     */
    $app->get('reports', ReportController::class . '@index')->name('reports');
    $app->post('report/store', ReportController::class . '@store')->name('report.store');

    $app->post('homepage', HomeController::class . '@skip')->name('intro.skip');

    $app->get('in', function () {
        return view('in');
    })->name('in');

    $app->get('temp', function () {
        return view('testing');
    })->name('temp');

    $app->get('old', function () {
        return view('old');
    })->name('old');

    $app->get('docs', function () {
        return View::make('docs.api.v1.index');
    });


});


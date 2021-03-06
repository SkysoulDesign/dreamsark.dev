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
use DreamsArk\Http\Controllers\Log\LogController;
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
use DreamsArk\Http\Controllers\User\InventoryController;
use DreamsArk\Http\Controllers\User\ProfileController;
use DreamsArk\Http\Controllers\User\PurchaseController;
use DreamsArk\Http\Controllers\User\Setting\SettingController;

$router->get('test', function () {
    return view('intro');
})->middleware('web')->name('intro');

$router->get('info', function () {
    phpinfo();
});

$router->get('in', function () {
    return view('in');
});

$router->get('kitchen-sink/{section?}', function ($section) {
    return view('kitchen-sink.index', compact('section'));
})->name('kitchen-sink')->middleware('web');

/** @var $router \Illuminate\Routing\Router */
$router->group(['middleware' => 'web'], function () use ($router) {

    /**
     * Home Controller
     */
    $router->get('/', ProjectController::class . '@index')->name('home');

    $router->get('log', LogController::class . '@index')->name('log.index');

    /**
     * Switch Language
     */
    $router->get('change-language/{lang}', HomeController::class . '@changeLanguage')->name('language');

    /**
     * Dashboard Controller
     */
    $router->get('dashboard', DashboardController::class . '@index')->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | Auth: Login & Registration Routes
    |--------------------------------------------------------------------------
    */
    $router->get('login', AuthController::class . '@login')->name('login');
    $router->post('login/store', AuthController::class . '@loginStore')->name('login.store');
    $router->get('register', AuthController::class . '@register')->name('register');
    $router->post('register/store', AuthController::class . '@registerStore')->name('register.store');
    $router->get('logout', AuthController::class . '@logout')->name('logout');

    /**
     * Mobile
     */
    $router->group(['prefix' => 'mobile', 'as' => 'mobile.'], function () use ($router) {
        $router->post('register', SessionController::class . '@storeMobile')->name('register.store');
        $router->post('sendVerify', SessionController::class . '@sendVerificationCode')->name('send.verify');
    });

    /**
     * Social
     */
    $router->group(['prefix' => 'login/social', 'as' => 'login.social.'], function () use ($router) {
        $router->post('/', AuthController::class . '@loginWithSocial')->name('post');
        $router->get('{social}/status', AuthController::class . '@loginWithSocialCallBack')->name('callback');
    });

    /*
    |--------------------------------------------------------------------------
    | Project Routes
    |--------------------------------------------------------------------------
    */
    $router->group(['prefix' => 'project', 'as' => 'project.'], function () use ($router) {

        $router->get('/', ProjectController::class . '@index')->name('index');
        $router->get('show/{project}', ProjectController::class . '@show')->name('show');

        /**
         * Project Idea Routes
         */
        $router->group(['prefix' => '{project}/idea', 'as' => 'idea.'], function () use ($router) {

            /**
             * Submission Controller
             */
            $router->group(['prefix' => 'submission', 'as' => 'submission.'], function () use ($router) {
                $router->post('store', SubmissionController::class . '@store')->name('store');
                $router->patch('{submission}/update', SubmissionController::class . '@update')->name('update');
            });

        });

        $router->post('{submission}/vote/store', SubmissionIdeaController::class . '@vote')->name('idea.submission.vote.store');

        /**
         * Temporarily
         */
        $router->post('comments/{project}/{commentable_type}', CommentController::class . '@store')->name('comment.store');

        /**
         * Vote Controller
         */
        $router->group(['prefix' => '{project}/vote', 'as' => 'vote.'], function () use ($router) {
            $router->get('/', VoteController::class . '@index')->name('index');
            $router->get('show/{vote}', VoteController::class . '@show')->name('show');
            $router->get('create', VoteController::class . '@create')->name('create');
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
    $router->group(['prefix' => 'user', 'as' => 'user.', 'middleware' => 'auth'], function () use ($router) {

        /**
         * Session Controller
         */
        $router->get('account', SessionController::class . '@index')->name('account');
        $router->patch('account/update', SessionController::class . '@update')->name('account.update');

        /**
         * Inventory Controller
         */
        $router->get('inventory', InventoryController::class . '@index')->name('inventory');

        /**
         * Purchases
         */
        $router->group(['prefix' => 'purchases', 'as' => 'purchase.'], function () use ($router) {

            $router->get('/', PurchaseController::class . '@index')->name('index');

            /**
             * Coin Controller
             */
            $router->group(['prefix' => 'coins', 'as' => 'coin.'], function () use ($router) {
//                $router->get('add', CoinController::class . '@create')->name('create');
                $router->post('store', CoinController::class . '@store')->name('store');
                $router->post('withdraw', CoinController::class . '@withdrawCoins')->name('withdraw');
            });

        });

        /**
         * Settings Controller
         */
        $router->get('settings', SettingController::class . '@index')->name('settings');
        $router->patch('settings/update', SettingController::class . '@update')->name('settings.update');

        /**
         * Project Controller
         */
        $router->group(['prefix' => 'project', 'as' => 'project.'], function () use ($router) {

//            $router->get('/', UserProjectController::class . '@index')->name('index');
//            $router->get('create', UserProjectController::class . '@create')->name('create');
//            $router->post('store', UserProjectController::class . '@store')->name('store');
//            $router->get('edit/{project}', UserProjectController::class . '@edit')->name('edit');
//            $router->patch('update/{project}', UserProjectController::class . '@update')->name('update');
//            $router->patch('fund/update/{project}', UserProjectController::class . '@fundUpdate')->name('fund.update');

            $router->get('show/{project}/iframe', ProjectController::class . '@showIframe')->name('show.iframe');
            $router->get('{project}/next/create', ProjectController::class . '@next')->name('next.create');
            $router->post('{project}/store', ProjectController::class . '@projectStore')->name('project.store');

//            $router->get('publish/{draft}', ProjectController::class . '@publish')->name('publish');
            /**
             * Project Synapse Controller
             */
            $router->get('synapse/show/{project}', SynapseController::class . '@show')->name('synapse.show');
            $router->post('synapse/store/{project}', SynapseController::class . '@store')->name('synapse.store');
            $router->post('script/store/{project}', ScriptController::class . '@store')->name('script.store');
            /**
             * Project Script Controller
             */
//        $router->post('script/store/{project}', ScriptController::class . '@store')->name('script.store');
            $router->get('script/show/{project}', ScriptController::class . '@show')->name('script.show');

            /**
             * Enroll Controller
             */
            $router->get('{project}/enroll/create', EnrollController::class . '@create')->name('enroll.create');
            $router->post('enroll/store/{expenditure}', EnrollController::class . '@store')->name('enroll.store');
            $router->post('unroll/store/{expenditure}', EnrollController::class . '@unroll')->name('unroll.store');

            /**
             * Fund Controller
             */
            $router->group(['middleware' => ['auth',], 'prefix' => 'fund', 'as' => 'fund.'], function () use ($router) {
                $router->get('create/{project}', FundController::class . '@create')->name('create');
                $router->post('store/{project}', FundController::class . '@store')->name('store');
                $router->post('vote/store/{enroller}', FundController::class . '@vote')->name('vote.store');
            });

            /**
             * Project Take Controller
             */
//        $router->post('take/store/{script}', TakeController::class . '@store')->name('take.store');

            /**
             * Project Pledge Controller
             */
//        $router->get('pledge/create/{project}', ProjectPledgeController::class . '@create')->name('pledge.create');
//        $router->post('pledge/store/{project}', ProjectPledgeController::class . '@store')->name('pledge.store');
        });

        /**
         * Profile Controller
         */
        $router->group(['prefix' => 'profile', 'as' => 'profile.'], function () use ($router) {

            $router->get('/', ProfileController::class . '@index')->name('index');
            $router->get('create', ProfileController::class . '@create')->name('create');
            $router->post('store', ProfileController::class . '@store')->name('store');
            $router->get('{profile}/edit', ProfileController::class . '@edit')->name('edit');
            $router->patch('{profile}/update', ProfileController::class . '@update')->name('update');
            $router->get('{profile}/show', ProfileController::class . '@show')->name('show');

            /**
             * Test.. what is this?
             */
//            $router->get('{profile}/as', ProfileController::class . '@as')->name('public');
        });

        /** User's Project Related Actions List */
        $router->group(['prefix' => 'activity', 'as' => 'activity.'], function () use ($router) {
//            $router->get('backer/list', UserProjectController::class . '@backerList')->name('backed.list');
//            $router->get('enroll/list', UserProjectController::class . '@enrolledList')->name('enrolled.list');
            $router->get('/', ProfileController::class . '@userEarningHistory')->name('earning');
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
    $router->group(['middleware' => ['auth', 'can:see-committee-section'], 'prefix' => 'committee', 'as' => 'committee.'], function () use ($router) {

        $router->get('/', CommitteeController::class . '@index')->name('index');


        /**
         * Project Controller
         */
        $router->group(['prefix' => 'project', 'as' => 'project.'], function () use ($router) {

            $router->get('review', CommitteeController::class . '@projectsInReviewStage')->name('review.index');
            $router->get('fund', CommitteeController::class . '@projectsInFundStage')->name('fund.index');
            $router->get('distribution', CommitteeController::class . '@projectsInDistributionStage')->name('distribution.index');

            $router->post('{project}/expense/store', ExpenseController::class . '@store')->name('expense.store');
            $router->post('{project}/crew/store', CrewController::class . '@store')->name('crew.store');

        });

        /**
         * Committee Staff Controller
         */
        $router->get('project-planning/{review}/manage', StaffController::class . '@create')->name('project.planning.manage');

        $router->post('create/staff/{project}', StaffController::class . '@store')->name('project.staff.store');
        $router->post('project/cast/store/{project}', CastController::class . '@store')->name('project.cast.store');
        $router->delete('project/expense/destroy/{expenditure}', ExpenditureController::class . '@destroy')->name('project.expenditure.destroy');
        $router->post('project/publish/{review}', StaffController::class . '@publish')->name('project.publish');
        /**
         * Project Cast Controller
         */
        $router->post('cast/store/{project}', CastController::class . '@store')->name('cast.store');
        /**
         * Project Crew Controller
         */
        $router->post('crew/store/{project}', CrewController::class . '@store')->name('crew.store');

        $router->group(['prefix' => 'project', 'as' => 'project.'], function () use ($router) {
            $router->group(['prefix' => 'fund', 'as' => 'fund.'], function () use ($router) {

                $router->get('{fund}/view', CommitteeController::class . '@ViewFundProcess')->name('view');
            });

            $router->group(['prefix' => 'distribution', 'as' => 'distribute.'], function () use ($router) {

                $router->get('{distribution}/view', CommitteeController::class . '@ViewDistributeProcess')->name('view');
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
    $router->group(['middleware' => ['auth', 'can:see-admin-section'], 'prefix' => 'admin', 'as' => 'admin.'], function () use ($router) {

        $router->get('/', AdminController::class . '@index')->name('index');

        /**
         * Profile Controller
         */
        $router->group(['prefix' => 'profile', 'as' => 'profile.'], function () use ($router) {

            $router->get('/', AdminProfileController::class . '@index')->name('index');
            $router->get('create', AdminProfileController::class . '@create')->name('create');
            $router->post('store', AdminProfileController::class . '@store')->name('store');
            $router->get('{profile}/edit', AdminProfileController::class . '@edit')->name('edit');
            $router->patch('{profile}/update', AdminProfileController::class . '@update')->name('update');
            $router->delete('{profile}/destroy', AdminProfileController::class . '@destroy')->name('destroy');

            /**
             * Questions Controller
             */
            $router->group(['prefix' => 'question', 'as' => 'question.'], function () use ($router) {
                $router->get('/', QuestionController::class . '@index')->name('index');
                $router->get('create', QuestionController::class . '@create')->name('create');
                $router->post('store', QuestionController::class . '@store')->name('store');
                $router->get('{question}/edit', QuestionController::class . '@edit')->name('edit');
                $router->patch('{question}/update', QuestionController::class . '@update')->name('update');
                $router->delete('{question}/destroy', QuestionController::class . '@destroy')->name('destroy');
            });

        });

        /**
         * Projects Controller
         */
        $router->group(['prefix' => 'project', 'as' => 'project.'], function () use ($router) {
            $router->get('/', AdminProjectController::class . '@index')->name('index');
        });


        /**
         * Users Controller
         */
        $router->group(['prefix' => 'user', 'as' => 'user.'], function () use ($router) {
            $router->get('/', UserController::class . '@index')->name('index');
            $router->get('create', UserController::class . '@create')->name('create');
            $router->post('store', UserController::class . '@store')->name('store');
            $router->get('{user}/edit', UserController::class . '@edit')->name('edit');
            $router->patch('{user}/update', UserController::class . '@update')->name('update');
            $router->delete('{user}/destroy', UserController::class . '@destroy')->name('destroy');
        });

        /**
         * Transaction Controller
         */
        $router->group(['prefix' => 'transaction', 'as' => 'transaction.'], function () use ($router) {
            $router->get('/', TransactionController::class . '@index')->name('index');
            $router->get('purchases/{trans_status}', TransactionController::class . '@getPurchaseList')->name('purchase');
            $router->get('withdrawals/{trans_status}', TransactionController::class . '@getWithdrawList')->name('withdraw');
            $router->get('update/{new_status}', TransactionController::class . '@updateAndProcess')->name('update');
        });

    });


    /**
     * Payment Related Routes
     */
    $router->get('payment/status/{result}', PaymentController::class . '@paymentStatus')->name('payment.status');
    $router->group(['prefix' => 'payment', 'as' => 'payment.', 'middleware' => 'transaction'], function () use ($router) {

        $router->get('/', PaymentController::class . '@index')->name('index');

        $router->any('{driver}/callback', PaymentController::class . '@callback')->name('callback');
        $router->any('{driver}/notify_callback', PaymentController::class . '@notify_callback')->name('notify_callback');

        $router->get('enquiry/event', PaymentController::class . '@transactionEnquiryEvent')->name('enquiry_event');
        /* $router->group(['prefix' => 'alipay', 'as' => 'alipay.'], function () use ($router) {
             $router->get('status', PaymentController::class . '@alipayStatus')->name('status');
             $router->any('notify', PaymentController::class . '@alipayNotifications')->name('notify');
         });
         $router->group(['prefix' => 'unionpay', 'as' => 'unionpay.'], function () use ($router) {
             $router->post('status', PaymentController::class . '@uPStatus')->name('status');
             $router->any('notify', PaymentController::class . '@uPNotifications')->name('notify');
         });*/

    });


    /**
     * Profile Controller
     */
//    $router->resource('user/profile', ProfileController::class, ['except' => ['destroy', 'create']]);
//    $router->get('user/profile/{profile}/create', ProfileController::class . '@create')->name('user.profile.create');
    $router->group(['prefix' => 'public', 'as' => 'public.'], function () use ($router) {
        $router->group(['prefix' => 'profile', 'as' => 'profile.'], function () use ($router) {
            $router->get('index', PublicProfileController::class . '@index')->name('index');
            $router->get('{profile}/list', PublicProfileController::class . '@usersByProfile')->name('list');
            $router->get('{profile}/{username}', PublicProfileController::class . '@showPublicProfile')->name('show');
//            $router->get('iframe/{profile}/{username}', PublicProfileController::class . '@showPublicProfileIframe')->name('show.iframe');
        });
    });

    /**
     * Vote Controller
     */
    $router->get('votes', VoteController::class . '@index')->name('votes');
    $router->get('vote/show/{vote}', VoteController::class . '@show')->name('vote.show');

    /**
     * Project Controller
     */
    $router->get('projects', ProjectController::class . '@index')->name('projects');

    $router->group(['prefix' => 'project', 'as' => 'project.'], function () use ($router) {

        $router->get('create', ProjectController::class . '@create')->name('create');
        $router->get('show/{project}', ProjectController::class . '@show')->name('show');
//        $router->get('show/{project}/iframe', ProjectController::class . '@showIframe')->name('show.iframe');
        $router->post('store', ProjectController::class . '@store')->name('store');
        $router->get('next/create/{project}', ProjectController::class . '@next')->name('next.create');
        $router->post('{project}/store', ProjectController::class . '@projectStore')->name('project.store');
//        $router->get('edit/{draft}', ProjectController::class . '@edit')->name('edit');
//        $router->post('update/{draft}', ProjectController::class . '@update')->name('update');
//        $router->get('publish/{draft}', ProjectController::class . '@publish')->name('publish');

        /**
         * Project Synapse Controller
         */
        $router->get('synapse/show/{project}', SynapseController::class . '@show')->name('synapse.show');
        $router->post('synapse/store/{project}', SynapseController::class . '@store')->name('synapse.store');
        $router->post('script/store/{project}', ScriptController::class . '@store')->name('script.store');
        /**
         * Project Script Controller
         */
//        $router->post('script/store/{project}', ScriptController::class . '@store')->name('script.store');
        $router->get('script/show/{project}', ScriptController::class . '@show')->name('script.show');

        /**
         * Enroll Controller
         */
        $router->get('enroll/create/{project}', EnrollController::class . '@create')->name('enroll.create');
        $router->post('enroll/store/{expenditure}', EnrollController::class . '@store')->name('enroll.store');
        $router->post('unroll/store/{expenditure}', EnrollController::class . '@unroll')->name('unroll.store');

        /**
         * Fund Controller
         */
        $router->group(['middleware' => ['auth',], 'prefix' => 'fund', 'as' => 'fund.'], function () use ($router) {
            $router->get('create/{project}', FundController::class . '@create')->name('create');
            $router->post('store/{project}', FundController::class . '@store')->name('store');
            $router->post('vote/store/{enroller}', FundController::class . '@vote')->name('vote.store');
        });

        /**
         * Project Take Controller
         */
//        $router->post('take/store/{script}', TakeController::class . '@store')->name('take.store');

        /**
         * Project Pledge Controller
         */
//        $router->get('pledge/create/{project}', ProjectPledgeController::class . '@create')->name('pledge.create');
//        $router->post('pledge/store/{project}', ProjectPledgeController::class . '@store')->name('pledge.store');
    });

    /**
     * User Applications
     */
    $router->get('user/application', ActorController::class . '@create')->name('user.application.actor');

    /**
     * Report Controller
     */
    $router->get('reports', ReportController::class . '@index')->name('reports');
    $router->post('report/store', ReportController::class . '@store')->name('report.store');

    $router->post('homepage', HomeController::class . '@skip')->name('intro.skip');

    $router->get('in', function () {
        return view('in');
    })->name('in');

    $router->get('temp', function () {
        return view('testing');
    })->name('temp');

    $router->get('old', function () {
        return view('old');
    })->name('old');

    $router->get('docs', function () {
        return View::make('docs.api.v1.index');
    });


});


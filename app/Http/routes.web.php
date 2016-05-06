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

/**
 * Artisan Commands
 */

use DreamsArk\Http\Controllers\Admin\AdminController;
use DreamsArk\Http\Controllers\Admin\Profile\ProfileController as AdminProfileController;
use DreamsArk\Http\Controllers\Admin\Question\QuestionController;
use DreamsArk\Http\Controllers\Admin\User\UserController;
use DreamsArk\Http\Controllers\Auth\AuthController;
use DreamsArk\Http\Controllers\Bag\CoinController;
use DreamsArk\Http\Controllers\Committee\CommitteeController;
use DreamsArk\Http\Controllers\Committee\Project\CastController;
use DreamsArk\Http\Controllers\Committee\Project\CrewController;
use DreamsArk\Http\Controllers\Committee\Project\ExpenditureController;
use DreamsArk\Http\Controllers\Committee\Project\ExpenseController;
use DreamsArk\Http\Controllers\Committee\Project\StaffController;
use DreamsArk\Http\Controllers\Dashboard\DashboardController;
use DreamsArk\Http\Controllers\Home\HomeController;
use DreamsArk\Http\Controllers\Project\EnrollController;
use DreamsArk\Http\Controllers\Project\FundController;
use DreamsArk\Http\Controllers\Project\Idea\SubmissionController as SubmissionIdeaController;
use DreamsArk\Http\Controllers\Project\ProjectController;
use DreamsArk\Http\Controllers\Project\Script\ScriptController;
use DreamsArk\Http\Controllers\Project\SubmissionController;
use DreamsArk\Http\Controllers\Project\Synapse\SynapseController;
use DreamsArk\Http\Controllers\Project\VoteController;
use DreamsArk\Http\Controllers\Report\ReportController;
use DreamsArk\Http\Controllers\Session\SessionController;
use DreamsArk\Http\Controllers\Translation\TranslationController;
use DreamsArk\Http\Controllers\User\Application\ActorController;
use DreamsArk\Http\Controllers\User\ProfileController;
use DreamsArk\Http\Controllers\User\ProjectController as UserProjectController;
use DreamsArk\Http\Controllers\User\Setting\SettingController;

//use DreamsArk\Http\Controllers\Project\ProjectPledgeController;

//use DreamsArk\Http\Controllers\Project\TakeController;

/** @var $app \Illuminate\Routing\Router */

$app->group(['middleware' => ['web']], function () use ($app) {
    $app->get('/', HomeController::class . '@index')->name('home');

    /**
     * Dashboard Controller
     */
    $app->get('dashboard', DashboardController::class . '@index')->name('dashboard');


    /**
     * Translation Controller
     */

    $app->group(['prefix' => 'translation', 'as' => 'translation.'], function () use ($app) {
        $app->get('import', TranslationController::class . '@import')->name('import');
        $app->get('export', TranslationController::class . '@export')->name('export');
        $app->get('sync', TranslationController::class . '@sync')->name('sync');
        $app->post('language/store', TranslationController::class . '@newLanguage')->name('newLanguage');
        $app->post('group/store', TranslationController::class . '@newGroup')->name('newGroup');
        $app->post('translation/store', TranslationController::class . '@newTranslation')->name('newTranslation');
        $app->post('update/{translation}', TranslationController::class . '@update')->name('update');
    });

    $app->get('translation/{language?}/{group?}', TranslationController::class . '@index')->name('translation');

    /**
     * Registration
     */
    $app->get('register', SessionController::class . '@create')->name('register');
    $app->post('register', SessionController::class . '@store')->name('register.store');

    /**
     * Login
     */
    $app->get('login', AuthController::class . '@create')->name('login');
    $app->post('login/store', AuthController::class . '@store')->name('login.store');
    $app->get('logout', AuthController::class . '@logout')->name('logout');

    $app->group(['prefix' => 'user', 'as' => 'user.'], function () use ($app) {

        /**
         * Session Controller
         */
        $app->get('account', SessionController::class . '@index')->name('account');
        $app->patch('account/update', SessionController::class . '@update')->name('account.update');

        /**
         * Settings Controller
         */
        $app->get('settings', SettingController::class . '@index')->name('settings');
        $app->patch('settings/update', SettingController::class . '@update')->name('settings.update');

        $app->get('projects', UserProjectController::class . '@index')->name('projects')->middleware(['auth']);

    });

    /**
     * Profile Controller
     */
    $app->resource('user/profile', ProfileController::class, ['except' => ['destroy', 'create']]);
    $app->get('user/profile/{profile}/create', ProfileController::class . '@create')->name('user.profile.create');
    $app->get('public/profile/{profile}/{username}', ProfileController::class . '@showPublicProfile')->name('user.profile.public');

    /**
     * Vote Controller
     */
    $app->get('votes', VoteController::class . '@index')->name('votes');
    $app->get('vote/show/{vote}', VoteController::class . '@show')->name('vote.show');

    /**
     * Submission Controller
     */
    $app->post('idea/submission/store/{project}', SubmissionController::class . '@store')->name('project.submission.store');
    $app->post('idea/submission/vote/{submission}/store', SubmissionIdeaController::class . '@vote')->name('project.idea.submission.vote.store');

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
     * Coin Controller
     */
    $app->group(['prefix' => 'purchase/coins', 'as' => 'coin.'], function () use ($app) {
        $app->get('create', CoinController::class . '@create')->name('create');
        $app->post('store', CoinController::class . '@store')->name('store');
    });


    /**
     * User Applications
     */
    $app->get('user/application', ActorController::class . '@create')->name('user.application.actor');

    /**
     * User Projects Controller
     */
//    $app->resource('user/profile', ProfileController::class, ['except' => ['destroy', 'create']]);
//    $app->get('user/profile/{profile}/create', ProfileController::class . '@create')->name('user.profile.create');

    $app->group(['prefix' => 'user', 'as' => 'user.', ['middleware' => ['auth']]], function () use ($app) {

        $app->get('projects', UserProjectController::class . '@index')->name('projects');

        $app->group(['prefix' => 'profile', 'as' => 'profile.'], function () use ($app) {
            $app->get('/', ProfileController::class . '@index')->name('index');
            $app->get('{profile}/create', ProfileController::class . '@create')->name('create');
            $app->post('{profile}/store', ProfileController::class . '@store')->name('store');
        });

        /*$app->get('project/publish/{draft}', UserProjectController::class . '@publish')->name('project.publish');
        $app->get('project/edit/{draft}', UserProjectController::class . '@edit')->name('project.edit');
        $app->post('project/update/{draft}', UserProjectController::class . '@update')->name('project.update');
        $app->post('project/store', UserProjectController::class . '@store')->name('project.store');

        $app->post('project/synapse/store/{project}', UserSynapseController::class . '@store')->name('project.synapse.store');
        $app->post('project/script/store/{project}', UserScriptController::class . '@store')->name('project.script.store');*/

    });


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


    /**
     * Admin Section Routes
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
        });

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

        /** Admin projects */
        $app->get('projects', ProjectController::class . '@adminIndex')->name('projects');

//        $app->resource('question', QuestionController::class, ['except' => ['show']]);


//    $app->get('user', AdminHomeController::class . '@user')->name('admin.users');

//        $app->resource('user', AdminUserController::class, ['except' => ['show']]);
//        $app->resource('profile', AdminProfileController::class, ['except' => ['show']]);


    });

    /**
     * Committee Section Routes
     */
    $app->group(['middleware' => ['auth', 'can:see-committee-section'], 'prefix' => 'committee', 'as' => 'committee.'], function () use ($app) {
        $app->get('/', CommitteeController::class . '@index')->name('index')->middleware();
        $app->get('project/review', CommitteeController::class . '@projectsInReviewStage')->name('project.review.list');
        /**
         * Committee Staff Controller
         */
        $app->get('project-planning/{review}/manage', StaffController::class . '@create')->name('project.planning.manage');
        $app->post('project/expense/store/{project}', ExpenseController::class . '@store')->name('project.expense.store');
        $app->post('project/crew/store/{project}', CrewController::class . '@store')->name('project.crew.store');

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

        $app->group(['prefix' => 'project/fund', 'as' => 'project.fund.'], function () use ($app) {
            $app->get('/', CommitteeController::class . '@projectsInFundStage')->name('list');
            $app->get('{fund}/view', CommitteeController::class . '@ViewFundProcess')->name('view');
        });
    });

});


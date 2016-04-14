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

use DreamsArk\Http\Controllers\Admin\AdminHomeController;
use DreamsArk\Http\Controllers\Admin\QuestionController;
use DreamsArk\Http\Controllers\Admin\ProfileController as AdminProfileController;
use DreamsArk\Http\Controllers\Auth\AuthController;
use DreamsArk\Http\Controllers\Bag\CoinController;
use DreamsArk\Http\Controllers\Committee\Project\CastController;
use DreamsArk\Http\Controllers\Committee\Project\CrewController;
use DreamsArk\Http\Controllers\Committee\Project\ExpenditureController;
use DreamsArk\Http\Controllers\Committee\Project\ExpenseController;
use DreamsArk\Http\Controllers\Committee\Project\StaffController;
use DreamsArk\Http\Controllers\Dashboard\DashboardController;
use DreamsArk\Http\Controllers\Home\HomeController;
use DreamsArk\Http\Controllers\Project\EnrollController;
use DreamsArk\Http\Controllers\Project\FundController;
use DreamsArk\Http\Controllers\Project\ProjectController;
use DreamsArk\Http\Controllers\Report\ReportController;
use DreamsArk\Http\Controllers\User\ProjectController as UserProjectController;
//use DreamsArk\Http\Controllers\Project\ProjectPledgeController;
use DreamsArk\Http\Controllers\Project\Script\ScriptController;
use DreamsArk\Http\Controllers\User\Project\ScriptController as UserScriptController;
use DreamsArk\Http\Controllers\Project\SubmissionController;
use DreamsArk\Http\Controllers\Project\Idea\SubmissionController as SubmissionIdeaController;
use DreamsArk\Http\Controllers\Project\Synapse\SynapseController;
use DreamsArk\Http\Controllers\User\Project\SynapseController as UserSynapseController;

//use DreamsArk\Http\Controllers\Project\TakeController;
use DreamsArk\Http\Controllers\Project\VoteController;
use DreamsArk\Http\Controllers\Session\SessionController;
use DreamsArk\Http\Controllers\Setting\SettingController;
use DreamsArk\Http\Controllers\Translation\TranslationController;
use DreamsArk\Http\Controllers\User\Application\ActorController;
use DreamsArk\Http\Controllers\User\ProfileController;

/** @var $app \Illuminate\Routing\Router */

$app->group([], function () use ($app) {
    $app->get('/', HomeController::class . '@index')->name('home');

    /**
     * Dashboard Controller
     */
    $app->get('dashboard', DashboardController::class . '@index')->name('dashboard');

    /**
     * Auth Controller
     */
    $app->get('login', AuthController::class . '@login')->name('login');
    $app->post('login/store', AuthController::class . '@store')->name('login.store');
    $app->get('logout', AuthController::class . '@logout')->name('logout');

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
     * Session Controller
     */
    $app->get('profile', SessionController::class . '@index')->name('profile');
    $app->get('register', SessionController::class . '@create')->name('register');
    $app->post('register/update', SessionController::class . '@update')->name('register.update');
    $app->post('register', SessionController::class . '@store')->name('register.store');


    /**
     * Settings Controller
     */
    $app->get('user/settings', SessionController::class . '@setting')->name('user.settings');
    $app->post('settings/update/{setting}', SettingController::class . '@update')->name('settings.update');

    /**
     * Profile Controller
     */
    $app->get('user/profile/index', ProfileController::class . '@index')->name('user.profiles');

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
    $app->get('project/create', ProjectController::class . '@create')->name('project.create');
    $app->get('project/show/{project}', ProjectController::class . '@show')->name('project.show');
    $app->post('project/store', ProjectController::class . '@store')->name('project.store');
    $app->get('project/next/create/{project}', ProjectController::class . '@next')->name('project.next.create');

    $app->post('project/{project}/store', ProjectController::class . '@projectStore')->name('project.project.store');

    /**
     * Fund Controller
     */
    $app->group(['prefix' => 'project/fund', 'as' => 'project.fund.'], function () use ($app) {
        $app->get('create/{project}', FundController::class . '@create')->name('create');
        $app->post('store/{project}', FundController::class . '@store')->name('store');
        $app->post('vote/store/{enroller}', FundController::class . '@vote')->name('vote.store');
    });

    /**
     * Fund Controller
     */
    $app->get('project/enroll/create/{project}', EnrollController::class . '@create')->name('project.enroll.create');
    $app->post('project/enroll/store/{expenditure}', EnrollController::class . '@store')->name('project.enroll.store');
    $app->post('project/unroll/store/{expenditure}', EnrollController::class . '@unroll')->name('project.unroll.store');

    /**
     * Project Synapse Controller
     */
    $app->post('project/synapse/store/{project}', SynapseController::class . '@store')->name('project.synapse.store');
    $app->get('project/synapse/show/{project}', SynapseController::class . '@show')->name('project.synapse.show');

    $app->group(['prefix' => 'committee', 'as' => 'committee.'], function () use ($app) {
        /**
         * Committee Staff Controller
         */
        $app->get('create/staff/{review}', StaffController::class . '@create')->name('project.staff.create');
        $app->post('create/staff/{project}', StaffController::class . '@store')->name('project.staff.store');

        $app->post('project/cast/store/{project}', CastController::class . '@store')->name('project.cast.store');
        $app->post('project/crew/store/{project}', CrewController::class . '@store')->name('project.crew.store');
        $app->post('project/expense/store/{project}', ExpenseController::class . '@store')->name('project.expense.store');

        $app->post('project/expense/destroy/{expenditure}', ExpenditureController::class . '@destroy')->name('project.expenditure.destroy');

        $app->post('project/publish/{review}', StaffController::class . '@publish')->name('project.publish');
    });


    $app->group(['prefix' => 'project', 'as' => 'project.'], function () use ($app) {
        /**
         * Project Script Controller
         */
        $app->post('script/store/{project}', ScriptController::class . '@store')->name('script.store');
        $app->get('script/show/{project}', ScriptController::class . '@show')->name('script.show');

        /**
         * Project Take Controller
         */
//        $app->post('take/store/{script}', TakeController::class . '@store')->name('take.store');

        /**
         * Project Cast Controller
         */
        $app->post('cast/store/{project}', CastController::class . '@store')->name('cast.store');

        /**
         * Project Crew Controller
         */
        $app->post('crew/store/{project}', CrewController::class . '@store')->name('crew.store');

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
    $app->group(['prefix' => 'user', 'as' => 'user.'], function () use ($app) {
        $app->get('projects', UserProjectController::class . '@index')->name('projects');
        $app->get('project/publish/{draft}', UserProjectController::class . '@publish')->name('project.publish');
        $app->get('project/edit/{draft}', UserProjectController::class . '@edit')->name('project.edit');
        $app->post('project/store', UserProjectController::class . '@store')->name('project.store');

        $app->post('project/synapse/store/{project}', UserSynapseController::class . '@store')->name('project.synapse.store');
        $app->post('project/script/store/{project}', UserScriptController::class . '@store')->name('project.script.store');

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
});

/**
 * Admin Section Routes
 */
$app->group(['middleware' => ['auth', 'role:!user'], 'prefix' => 'admin'], function () use ($app) {
    $app->get('index', AdminHomeController::class . '@index')->name('admin.index');
    $app->get('user', AdminHomeController::class . '@user')->name('admin.users');

    /*$app->group(['prefix' => 'question', 'as' => 'question.'], function () use ($app) {
        $app->get('index', QuestionController::class . '@index')->name('index');
        $app->get('create', QuestionController::class . '@create')->name('create');
        $app->post('post', QuestionController::class . '@post')->name('create.post');
        $app->get('{questionnaire}/edit', QuestionController::class . '@edit')->name('edit');
        $app->post('{questionnaire}/update', QuestionController::class . '@update')->name('edit.update');
        $app->get('{questionnaire}/delete', QuestionController::class . '@delete')->name('delete');

    });*/
    $app->resource('question', QuestionController::class, ['except' => ['show']]);
    $app->resource('profile', AdminProfileController::class, ['prefix' => 'profile']);

    /*$app->group(['prefix' => 'profile', 'as' => 'profile.'], function () use ($app) {
        $app->get('index', AdminProfileController::class . '@index')->name('index');
        $app->get('create', AdminProfileController::class . '@create')->name('create');
        $app->post('post', AdminProfileController::class . '@post')->name('create.post');
        $app->get('{profile}/edit', AdminProfileController::class . '@edit')->name('edit');
        $app->post('{profile}/update', AdminProfileController::class . '@update')->name('edit.update');
        $app->get('{profile}/delete', AdminProfileController::class . '@delete')->name('delete');
    });*/

});


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
Route::get('artisan/{mode?}/{queue?}', ['as' => 'artisan', 'uses' => function ($mode = 'refresh', $queue = 'default') {

//    if (Gate::denies('execute-artisan-commands', auth()->user())) {
//        return redirect()->route('home');
//    }

    switch ($mode) {
        case "queue" :
            Artisan::call('queue:work', ['--queue' => $queue]);
            break;
        case "backup":
            Artisan::call('backup:run', ['--only-db' => true]);
            break;
        case "refresh" :
            Artisan::call('migrate:refresh', ['--seed' => true]);
            break;
        case "migrate":
            Artisan::call('migrate');
            break;
        case "seed":
            Artisan::call('db:seed');
            break;
        case "reset":
            Artisan::call('migrate:reset');
            break;
        case "rollback":
            Artisan::call('migrate:rollback');
            break;
    }

    return redirect()->route('home');

}]);

Route::get('/', ['as' => 'home', 'uses' => 'Home\HomeController@index']);

//app()->setLocale('cn');

/**
 * Dashboard Controller
 */
Route::get('dashboard', ['as' => 'dashboard', 'uses' => 'Dashboard\DashboardController@index']);

/**
 * Auth Controller
 */
Route::get('login', ['as' => 'login', 'uses' => 'Auth\AuthController@login']);
Route::post('login/store', ['as' => 'login.store', 'uses' => 'Auth\AuthController@store']);
Route::get('logout', ['as' => 'logout', 'uses' => 'Auth\AuthController@logout']);

/**
 * Translation Controller
 */
Route::get('translation/import', ['as' => 'translation.import', 'uses' => 'Translation\TranslationController@import']);
Route::get('translation/export', ['as' => 'translation.export', 'uses' => 'Translation\TranslationController@export']);
Route::get('translation/sync', ['as' => 'translation.sync', 'uses' => 'Translation\TranslationController@sync']);
Route::post('translation/language/store', ['as' => 'translation.newLanguage', 'uses' => 'Translation\TranslationController@newLanguage']);
Route::post('translation/group/store', ['as' => 'translation.newGroup', 'uses' => 'Translation\TranslationController@newGroup']);
Route::post('translation/translation/store', ['as' => 'translation.newTranslation', 'uses' => 'Translation\TranslationController@newTranslation']);
Route::post('translation/update/{translation}', ['as' => 'translation.update', 'uses' => 'Translation\TranslationController@update']);
Route::get('translation/{language?}/{group?}', ['as' => 'translation', 'uses' => 'Translation\TranslationController@index']);

/**
 * Session Controller
 */
Route::get('profile', ['as' => 'profile', 'uses' => 'Session\SessionController@index']);
Route::get('register', ['as' => 'register', 'uses' => 'Session\SessionController@create']);
Route::post('register/update', ['as' => 'register.update', 'uses' => 'Session\SessionController@update']);
Route::post('register', ['as' => 'register.store', 'uses' => 'Session\SessionController@store']);


/**
 * Settings Controller
 */
Route::post('settings/update/{setting}', ['as' => 'settings.update', 'uses' => 'Setting\SettingController@update']);

/**
 * Vote Controller
 */
Route::get('votes', ['as' => 'votes', 'uses' => 'Project\VoteController@index']);
Route::get('vote/show/{vote}', ['as' => 'vote.show', 'uses' => 'Project\VoteController@show']);

/**
 * Idea Controller
 */
//Route::get('ideas', ['as' => 'project.ideas', 'uses' => 'Project\Idea\IdeaController@index']);
//Route::get('idea/show/{idea}', ['as' => 'project.idea.show', 'uses' => 'Project\Idea\IdeaController@show']);

/**
 * Submission Controller
 */
Route::post('idea/submission/store/{project}', ['as' => 'project.submission.store', 'uses' => 'Project\SubmissionController@store']);
Route::post('idea/submission/vote/{submission}/store', ['as' => 'project.idea.submission.vote.store', 'uses' => 'Project\Idea\SubmissionController@vote']);

/**
 * Project Controller
 */
Route::get('projects', ['as' => 'projects', 'uses' => 'Project\ProjectController@index']);
Route::get('project/create', ['as' => 'project.create', 'uses' => 'Project\ProjectController@create']);
Route::get('project/show/{project}', ['as' => 'project.show', 'uses' => 'Project\ProjectController@show']);
Route::post('project/store', ['as' => 'project.store', 'uses' => 'Project\ProjectController@store']);
Route::get('project/next/create/{project}', ['as' => 'project.next.create', 'uses' => 'Project\ProjectController@next']);

Route::post('project/{project}/store', ['as' => 'project.project.store', 'uses' => 'Project\ProjectController@projectStore']);

/**
 * Fund Controller
 */
Route::get('project/fund/create/{project}', ['as' => 'project.fund.create', 'uses' => 'Project\FundController@create']);
Route::post('project/fund/store/{project}', ['as' => 'project.fund.store', 'uses' => 'Project\FundController@store']);
Route::post('project/fund/vote/store/{enroller}', ['as' => 'project.fund.vote.store', 'uses' => 'Project\FundController@vote']);

/**
 * Fund Controller
 */
Route::get('project/enroll/create/{project}', ['as' => 'project.enroll.create', 'uses' => 'Project\EnrollController@create']);
Route::post('project/enroll/store/{expenditure}', ['as' => 'project.enroll.store', 'uses' => 'Project\EnrollController@store']);
Route::post('project/unroll/store/{expenditure}', ['as' => 'project.unroll.store', 'uses' => 'Project\EnrollController@unroll']);

/**
 * Project Synapse Controller
 */
Route::post('project/synapse/store/{project}', ['as' => 'project.synapse.store', 'uses' => 'Project\Synapse\SynapseController@store']);
Route::get('project/synapse/show/{project}', ['as' => 'project.synapse.show', 'uses' => 'Project\Synapse\SynapseController@show']);

/**
 * Committee Staff Controller
 */
Route::get('committee/create/staff/{review}', ['as' => 'committee.project.staff.create', 'uses' => 'Committee\Project\StaffController@create']);
Route::post('committee/create/staff/{project}', ['as' => 'committee.project.staff.store', 'uses' => 'Committee\Project\StaffController@store']);

Route::post('committee/project/cast/store/{project}', ['as' => 'committee.project.cast.store', 'uses' => 'Committee\Project\CastController@store']);
Route::post('committee/project/crew/store/{project}', ['as' => 'committee.project.crew.store', 'uses' => 'Committee\Project\CrewController@store']);
Route::post('committee/project/expense/store/{project}', ['as' => 'committee.project.expense.store', 'uses' => 'Committee\Project\ExpenseController@store']);

Route::post('committee/project/expense/destroy/{expenditure}', ['as' => 'committee.project.expenditure.destroy', 'uses' => 'Committee\Project\ExpenditureController@destroy']);

Route::post('committee/project/publish/{review}', ['as' => 'committee.project.publish', 'uses' => 'Committee\Project\StaffController@publish']);


/**
 * Project Script Controller
 */
Route::post('project/script/store/{project}', ['as' => 'project.script.store', 'uses' => 'Project\Script\ScriptController@store']);
Route::get('project/script/show/{project}', ['as' => 'project.script.show', 'uses' => 'Project\Script\ScriptController@show']);

/**
 * Project Take Controller
 */
Route::post('project/take/store/{script}', ['as' => 'project.take.store', 'uses' => 'Project\TakeController@store']);

/**
 * Project Cast Controller
 */
Route::post('project/cast/store/{project}', ['as' => 'project.cast.store', 'uses' => 'Project\CastController@store']);

/**
 * Project Crew Controller
 */
Route::post('project/crew/store/{project}', ['as' => 'project.crew.store', 'uses' => 'Project\CrewController@store']);

/**
 * Project Pledge Controller
 */
Route::get('project/pledge/create/{project}', ['as' => 'project.pledge.create', 'uses' => 'Project\ProjectPledgeController@create']);
Route::post('project/pledge/store/{project}', ['as' => 'project.pledge.store', 'uses' => 'Project\ProjectPledgeController@store']);

/**
 * Coin Controller
 */
Route::get('purchase/coins/create', ['as' => 'coin.create', 'uses' => 'Bag\CoinController@create']);
Route::post('purchase/coins/store', ['as' => 'coin.store', 'uses' => 'Bag\CoinController@store']);


/**
 * User Applications
 */
Route::get('user/application', ['as' => 'user.application.actor', 'uses' => 'User\Application\ActorController@create']);

/**
 * User Projects Controller
 */
Route::get('user/projects', ['as' => 'user.projects', 'uses' => 'User\ProjectController@index']);
Route::get('user/project/publish/{draft}', ['as' => 'user.project.publish', 'uses' => 'User\ProjectController@publish']);
Route::get('user/project/edit/{draft}', ['as' => 'user.project.edit', 'uses' => 'User\ProjectController@edit']);
Route::post('user/project/store', ['as' => 'user.project.store', 'uses' => 'User\ProjectController@store']);

Route::post('user/project/synapse/store/{project}', ['as' => 'user.project.synapse.store', 'uses' => 'User\Project\SynapseController@store']);
Route::post('user/project/script/store/{project}', ['as' => 'user.project.script.store', 'uses' => 'User\Project\ScriptController@store']);


/**
 * Report Controller
 */
Route::get('reports', ['as' => 'reports', 'uses' => 'Report\ReportController@index']);
Route::post('report/store', ['as' => 'report.store', 'uses' => 'Report\ReportController@store']);

//Route::get('intro', ['as' => 'intro', 'uses' => function () {
//    return view('intro-new');
//}]);

Route::post('homepage', ['as' => 'intro.skip', 'uses' => 'Home\HomeController@skip']);;

Route::get('in', ['as' => 'in', 'uses' => function () {
    return view('in');
}]);

Route::get('temp', ['as' => 'temp', 'uses' => function () {
    return view('testing');
}]);

Route::get('old', ['as' => 'old', 'uses' => function () {
    return view('old');
}]);
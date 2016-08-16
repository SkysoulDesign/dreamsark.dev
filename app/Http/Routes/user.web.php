<?php

/**
 * Project
 */
use DreamsArk\Http\Controllers\User\ProjectController;

$router->group(['prefix' => 'user', 'as' => 'user.', 'middleware' => 'web'], function ($router) {

    /**
     * Project Controller
     */
    $router->group(['prefix' => 'project', 'as' => 'project.'], function () use ($router) {

        $router->get('/', ProjectController::class . '@index')->name('index');
        $router->get('create', ProjectController::class . '@create')->name('create');
        $router->get('{project}/edit', ProjectController::class . '@edit')->name('edit');
        $router->post('store', ProjectController::class . '@store')->name('store');
        $router->patch('{project}/update', ProjectController::class . '@update')->name('update');
        $router->patch('{project}/fund/update/', ProjectController::class . '@fundUpdate')->name('fund.update');

    });

});

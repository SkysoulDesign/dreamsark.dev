<?php

use DreamsArk\Http\Controllers\Project\ManageController;
use DreamsArk\Http\Controllers\Project\ProjectController;

/** @var $router \Illuminate\Routing\Router */

/**
 * Project
 */
$router->group(['prefix' => 'project', 'as' => 'project.', 'middleware' => 'web'], function ($router) {

    /**
     * Manage Controller
     */
    $router->group(['prefix' => '{project}/manage', 'as' => 'manage.'], function ($router) {
        $router->get('edit', ManageController::class . '@edit')->name('edit');
        $router->patch('update', ManageController::class . '@update')->name('update');
        $router->post('complete', ManageController::class . '@complete')->name('complete');
    });

    $router->post('manage/dispense/{dispense}/pay', ManageController::class . '@pay')->name('manage.dispense.pay');

});

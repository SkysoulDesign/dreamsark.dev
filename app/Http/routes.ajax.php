<?php

/** AJAX Requests with Middleware */
use DreamsArk\Http\Controllers\User\ProfileController;

$app->group(['middleware' => ['ajax'], 'prefix' => 'ajx', 'as' => 'ajax.'], function () use ($app) {
    $app->group(['prefix' => 'user', 'as' => 'user.'], function () use ($app) {
        $app->get('profile-form', ProfileController::class . '@getProfileForm')->name('profile.form');
    });
});
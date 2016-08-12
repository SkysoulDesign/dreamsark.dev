<?php

/**
 * Api V1 Routes
 */
use DreamsArk\Http\Controllers\User\ProfileController;
use DreamsArk\Models\Game\Item;
use DreamsArk\Models\User\User;

$router->group(['prefix' => 'api/v1'], function ($router) {

    $router->get('/', function () {
        return response()->json(['data' => 'hello world']);
    });

    $router->get('user/{user}/items', function (User $user) {
        return $user->getAttribute('items');
    });

    $router->get('items', function (Item $item) {
        return $item->all();
    });

    $router->get('user/{user}/info', function (User $user, Item $item) {
        return [
            'profile' => $user->profiles,
            'items' => $user->items,
        ];
    });

    /**
     * Profile
     */
    $router->get('questions', ProfileController::class . '@questions')->name('user.profile.questions');

});


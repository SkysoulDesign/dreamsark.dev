<?php

/**
 * Api V1 Routes
 */
use DreamsArk\Http\Controllers\User\ProfileController;
use DreamsArk\Models\Game\Item;
use DreamsArk\Models\User\User;

$app->group(['prefix' => 'api/v1'], function () use ($app) {

    $app->get('/', function () {
        return response()->json(['data' => 'hello world']);
    });

    $app->get('user/{user}/items', function (User $user) {
        return $user->getAttribute('items');
    });

    $app->get('items', function (Item $item) {
        return $item->all();
    });

    $app->get('user/{user}/info', function (User $user, Item $item) {
        return [
            'profile' => $user->profiles,
            'items' => $user->items,
        ];
    });

    /**
     * Profile
     */
    $app->get('questions', ProfileController::class . '@questions')->name('user.profile.questions');

});


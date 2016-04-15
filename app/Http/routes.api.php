<?php

/**
 * Api V1 Routes
 */
$app->group(['prefix' => 'api/v1'], function () use ($app) {
    $app->get('/', function () {
        return response()->json(['data' => 'hello world']);
    });
});


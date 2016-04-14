<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

use DreamsArk\Models\Master\Profile;

$factory->define(DreamsArk\Models\User\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});
/**
 * create Dynamic data for Profiles
$factory->define(Profile::class, function (Faker\Generator $faker) {
    $name = $faker->name;
    return [
        'name' => $name,
        'display_name' => ucwords($name),
        'description' => $faker->paragraph(1),
    ];
});
 */

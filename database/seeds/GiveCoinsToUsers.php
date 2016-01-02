<?php

use DreamsArk\Commands\Bag\PurchaseCoinCommand;
use DreamsArk\Models\User\User;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;

class GiveCoinsToUsers extends Seeder
{

    use DispatchesJobs;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        /**
         * Purchase Coins
         */
        User::all()->each(function ($user) {
            $this->dispatch(new PurchaseCoinCommand($user, rand(5000, 50000)));
        });;
    }

}

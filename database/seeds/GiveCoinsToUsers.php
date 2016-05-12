<?php

use DreamsArk\Jobs\User\Bag\PurchaseCoinJob;
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
            $this->dispatch(new PurchaseCoinJob($user, rand(5000, 50000)));
        });;
    }

}

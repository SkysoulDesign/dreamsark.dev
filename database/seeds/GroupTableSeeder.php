<?php

use DreamsArk\Commands\Translation\CreateGroupCommand;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;

class GroupTableSeeder extends Seeder
{

    use DispatchesJobs;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languages = collect(['forms']);

        $languages->each(function ($language) {
            $this->dispatch(new CreateGroupCommand($language));
        });
    }
}

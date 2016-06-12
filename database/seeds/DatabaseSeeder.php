<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $isLocalEnv = app()->environment() == 'local' ?: false;

        Model::unguard();

        $this->call(RoleTableSeeder::class);
        $this->call(UserTableSeeder::class);
//        $this->call(PositionTableSeeder::class);

        Model::reguard();
        if ($isLocalEnv)
            $this->call(GiveCoinsToUsers::Class);
        $this->call(SetLanguageToEnglish::Class);
        Model::unguard();

        Model::reguard();

        $this->call(QuestionTypeTableSeeder::class);
        $this->call(QuestionTableSeeder::class);
        $this->call(QuestionSectionTableSeeder::class);
        $this->call(ProfileTableSeeder::class);
        if ($isLocalEnv)
            $this->call(CreateDummyProject::class);
    }
}

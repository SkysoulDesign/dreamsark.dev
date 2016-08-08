<?php

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

//        Model::unguard();

        $this->call(RoleTableSeeder::class);
        $this->call(UserTableSeeder::class);
//        $this->call(PositionTableSeeder::class);

//        Model::reguard();
//        $this->call(GiveCoinsToUsers::Class);
//        $this->call(SetLanguageToEnglish::Class);
//        Model::unguard();

//        Model::reguard();

        $this->call(TypeTableSeeder::class);
        $this->call(QuestionTableSeeder::class);
        $this->call(QuestionSectionTableSeeder::class);
        $this->call(ProfileTableSeeder::class);
//
        $this->call(GameGroupTableSeeder::class);
        $this->call(ItemTableSeeder::class);
//        $this->call(CreateDummyProject::class);
    }
}

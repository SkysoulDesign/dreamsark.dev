<?php

use DreamsArk\Jobs\Admin\Question\CreateQuestionJob;
use Illuminate\Database\Seeder;

class QuestionTableSeeder extends Seeder
{
    /**
     * @var \Faker\Generator
     */
    private $faker;

    public function __construct(Faker\Generator $faker)
    {
        $this->faker = $faker;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        foreach(range(1,5) as $range){

            $data = [
                'question'   => $this->faker->sentence,
                'category'   => 'general',
                'type'       => 'text',
                'is_primary' => 1
            ];

            $question = dispatch(new CreateQuestionJob($data));

        }

    }

}

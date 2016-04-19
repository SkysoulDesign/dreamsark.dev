<?php

use DreamsArk\Jobs\Admin\Question\CreateQuestionJob;
use DreamsArk\Models\Master\Question;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CreateQuestionJobTest extends TestCase
{

    use DatabaseTransactions;

    /**
     * A basic test example.
     *
     * @test
     */
    public function it_creates_a_new_question()
    {

        $data = [
            'question'   => 'Whats your nickname?',
            'category'   => 'general',
            'type'       => 'text',
            'is_primary' => 1
        ];

        $question = dispatch(new CreateQuestionJob($data));

        $this->assertInstanceOf(Question::class, $question);

    }
    
}

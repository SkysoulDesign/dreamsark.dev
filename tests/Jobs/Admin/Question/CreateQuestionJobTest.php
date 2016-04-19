<?php

use DreamsArk\Events\Admin\Question\QuestionWasCreated;
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

    /**
     * Expects Events to be fired
     *
     * @test
     */
    public function it_expects_events_to_be_triggered()
    {
        $this->expectsEvents(QuestionWasCreated::class);
        $this->it_creates_a_new_question();
    }

}

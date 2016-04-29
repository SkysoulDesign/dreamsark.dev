<?php

use DreamsArk\Events\Admin\Question\QuestionWasCreated;
use DreamsArk\Jobs\Admin\Question\CreateQuestionJob;
use DreamsArk\Models\Master\Question\Question;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class CreateQuestionJobTest
 */
class CreateQuestionJobTest extends TestCase
{

    use DatabaseTransactions, TypeTrait;

    /**
     * A basic test example.
     *
     * @test
     */
    public function it_creates_a_new_question()
    {

        $type = $this->createType();

        $question = dispatch(new CreateQuestionJob('What is your name?', $type));

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

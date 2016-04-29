<?php

use DreamsArk\Models\Master\Question\Option;
use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\Master\Question\Type;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class QuestionControllerTest
 */
class QuestionControllerTest extends TestCase
{

    use DatabaseTransactions, UserTrait, TypeTrait, OptionTrait, QuestionTrait;

    /**
     * It Displays the Index page
     *
     * @test
     */
    public function it_displays_the_index_page()
    {
        $this->actingAs($this->createUser([], 'admin'));

        $this->route('GET', 'admin.question.index');

        $this->assertResponseOk();
        $this->assertViewHasAll([
            'questions' => Question::all()->load('type'),
        ]);
    }

    /**
     * Test if create Question Page is being displayed correctly
     *
     * @test
     */
    public function it_displays_the_create_question_page()
    {
        $this->actingAs($this->createUser([], 'admin'));

        $this->route('GET', 'admin.question.create');

        $this->assertResponseOk();
        $this->assertViewHasAll([
            'types'   => Type::all(),
            'options' => Option::all(),
        ]);
    }

    /**
     * test create a question of standard types (the one which doesnt have options)
     *
     * @test
     */
    public function it_creates_a_new_question_of_the_standard_type()
    {

        $this->actingAs($this->createUser([], 'admin'));

        $data = [
            'question' => 'How old are you my friend?',
            'type'     => $this->createType()->getAttribute('id')
        ];

        $this->route('POST', 'admin.question.store', $data);
        $this->assertRedirectedToRoute('admin.question.index');

    }

    /**
     * Test Creating an option with manually inputted options
     *
     * @test
     */
    public function it_creates_a_new_question_with_options()
    {

        $this->actingAs($this->createUser([], 'admin'));


        $data = [
            'question' => 'How old are you my friend?',
            'type'     => $this->getOrCreateType(['name' => 'checkbox'])->getAttribute('id'),
            'options'  => ['hello', 'world', 'how', 'are', 'you']
        ];

        $this->route('POST', 'admin.question.store', $data);
        $this->assertRedirectedToRoute('admin.question.index');

    }

    /**
     * Test Creating a question with values which already exists on the database and new ones introduced manually
     *
     * @test
     */
    public function it_creates_a_new_question_with_mixed_options()
    {

        $this->actingAs($this->createUser([], 'admin'));

        $option = $this->createOption(['name' => 'test']);

        $data = [
            'question' => 'How old are you my friend?',
            'type'     => $this->getOrCreateType(['name' => 'radio'])->getAttribute('id'),
            'options'  => [$option->getAttribute('name'), 'hello', 'world', 'how', 'are', 'you']
        ];

        $this->route('POST', 'admin.question.store', $data);
        $this->assertRedirectedToRoute('admin.question.index');

    }

    /**
     * Test if update can update an Question
     *
     * @test
     */
    public function it_updates_a_standard_type_question()
    {

        $this->actingAs($this->createUser([], 'admin'));

        $question = $this->createQuestion(['question' => 'Old Question']);

        $data = [
            'question' => 'New Question?',
            'type'     => $this->getOrCreateType(['name' => 'text'])->getAttribute('id')
        ];

        $this->route('PATCH', 'admin.question.update', $question, $data);

        $this->assertEquals($question->fresh()->getAttribute('question'), "New Question?");

    }

    /**
     * Test if it question with options is being updated correctly
     *
     * @test
     */
    public function it_updates_a_question_with_options()
    {

        $this->actingAs($this->createUser([], 'admin'));

        $question = $this->createQuestion(['question' => 'Old Question']);

        $data = [
            'question' => 'New Question?',
            'type'     => $this->getOrCreateType(['name' => 'checkbox'])->getAttribute('id'),
            'options'  => ['hello', 'world', 'how', 'are', 'you']
        ];

        $this->route('PATCH', 'admin.question.update', $question, $data);
        $this->assertCount(5, $question->options);

    }

    /**
     * Test if its showing the Editing View Correctly
     *
     * @test
     */
    public function it_displays_the_edit_page()
    {
        $this->actingAs($this->createUser([], 'admin'));
        $question = $this->createQuestion();

        $this->route('GET', 'admin.question.edit', $question);

        $this->assertResponseOk();
        $this->assertViewHasAll([
            'question' => $question->fresh()->load(['options', 'type']),
            'types'    => Type::all(),
            'options'  => Option::all(),
        ]);

    }

    /**
     * Test deleting a question
     *
     * @test
     */
    public function it_deletes_a_question()
    {

        $this->actingAs($this->createUser([], 'admin'));
        $question = $this->createQuestion();

        $this->route('DELETE', 'admin.question.destroy', $question);

        $this->dontSeeInDatabase('questions', $question->toArray());
        $this->assertRedirectedToRoute('admin.question.index');

    }

}

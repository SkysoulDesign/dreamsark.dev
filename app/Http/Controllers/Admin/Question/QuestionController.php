<?php

namespace DreamsArk\Http\Controllers\Admin\Question;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Admin\Question\StoreQuestionRequest;
use DreamsArk\Http\Requests\Admin\Question\UpdateQuestionRequest;
use DreamsArk\Jobs\Admin\Question\CreateQuestionJob;
use DreamsArk\Jobs\Admin\Question\DeleteQuestionJob;
use DreamsArk\Jobs\Admin\Question\UpdateQuestionJob;
use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\Master\Question\Type;
use DreamsArk\Models\Master;
use Illuminate\Http\Request;

/**
 * Class QuestionController
 *
 * @package DreamsArk\Http\Controllers\Admin
 */
class QuestionController extends Controller
{

    /**
     * @param Question $question
     * @return $this
     * @todo Implement Repository
     */
    public function index(Question $question)
    {
        return view('admin.question.index')->with('questions', $question->all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Type $type
     * @return \Illuminate\Http\Response
     * @todo Implements Repository
     */
    public function create(Type $type)
    {
        return view('admin.question.create')->with('types', $type->all());
    }

    /**
     * @param StoreQuestionRequest|Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreQuestionRequest $request)
    {

        /**
         * Create Question
         */
        $question = $this->dispatch(new CreateQuestionJob(
            $request->all(),
            $request->get('type')
        ));

        return redirect()->route('admin.question.index')->withSuccess('Question created successfully');

    }

    /**
     * @param Question $question
     * @param Type $type
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @todo Implement Repository
     */
    public function edit(Question $question, Type $type)
    {
        return view('admin.question.edit', compact('question'))->with('types', $type->all());
    }

    /**
     * @param Question $question
     * @param UpdateQuestionRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateQuestionRequest $request, Question $question)
    {

        $question = dispatch(new UpdateQuestionJob(
            $question,
            $request->only('question'),
            $request->get('type')
        ));

        return redirect()->back()->withSuccess('Question updated successfully');

    }

    /**
     * @param Request $request
     * @param Question $question
     * @return mixed
     */
    public function destroy(Request $request, Question $question)
    {

        /**
         * Determines if user is authorized to perform this action
         */
        $this->authorize('delete-question', $request->user());

        $this->dispatch(new DeleteQuestionJob($question));

        return redirect()->route('admin.question.index')->withSuccess('Question deleted successfully');
    }

}

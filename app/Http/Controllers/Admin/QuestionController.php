<?php

namespace DreamsArk\Http\Controllers\Admin;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Admin\QuestionnaireRequest;
use DreamsArk\Jobs\Admin\Question\CreateQuestionJob;
use DreamsArk\Jobs\Admin\Question\UpdateQuestionJob;
use DreamsArk\Jobs\DeleteItemByObjectJob;
use DreamsArk\Models\Master\Questionnaire;
use Illuminate\Http\Request;

/**
 * Class QuestionController
 * @package DreamsArk\Http\Controllers\Admin
 */
class QuestionController extends Controller
{
    /**
     * @var string
     */
    private $defaultRoute = 'admin.question.index';

    /**
     *
     */
    protected function getMasterData()
    {
        return [
            'type' => [
                'text' => 'Text', 'select' => 'Dropdown', 'radio' => 'Choose One', 'checkbox' => 'Choose Multiple', 'file' => 'Upload File', 'textarea' => 'Content', 'date' => 'Date'
            ],
            'category' => [
                'general' => 'General', 'image-gallery' => 'Image Gallery', 'video-gallery' => 'Video Gallery', 'task' => 'Tasks', 'refer' => 'References'
            ]
        ];
    }

    /**
     * @param Questionnaire $questionnaire
     * @return $this
     */
    public function index(Questionnaire $questionnaire)
    {
        return view('admin.question.index')->with('questions', $questionnaire->all())
            ->with('masterData', $this->getMasterData());
    }

    /**
     *
     */
    public function create()
    {
        return view('admin.question.create')
            ->with('masterData', $this->getMasterData());
    }

    /**
     * @param QuestionnaireRequest|Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(QuestionnaireRequest $request)
    {

        $response = dispatch(new CreateQuestionJob($request->all()));
        if (!$response)
            return redirect()->route($this->defaultRoute)->withErrors('Unable to save record');
        return redirect()->route($this->defaultRoute)->withSuccess('Question created successfully');

    }

    /**
     * @param Questionnaire $question
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @internal param Questionnaire $questionnaire
     */
    public function edit(Questionnaire $question)
    {
        return view('admin.question.edit')->with('question', $question)
            ->with('masterData', $this->getMasterData());
    }

    /**
     * @param Questionnaire $question
     * @param QuestionnaireRequest|Request $request
     * @return \Illuminate\Http\RedirectResponse
     * @internal param Questionnaire $questionnaire
     */
    public function update(Questionnaire $question, QuestionnaireRequest $request)
    {

        $response = dispatch(new UpdateQuestionJob($question, $request->all()));
        if (!$response)
            return redirect()->route($this->defaultRoute)->withErrors('Unable to save record');
        return redirect()->route($this->defaultRoute)->withSuccess('Question updated successfully');

    }

    /**
     * @param Questionnaire $question
     * @return mixed
     * @internal param Questionnaire $questionnaire
     */
    public function destroy(Questionnaire $question)
    {
        $response = dispatch(new DeleteItemByObjectJob($question));
        if (!$response)
            return redirect()->route($this->defaultRoute)->withErrors('Unable to delete record');
        return redirect()->route($this->defaultRoute)->withSuccess('Question deleted successfully');
    }
}

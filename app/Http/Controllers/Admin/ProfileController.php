<?php

namespace DreamsArk\Http\Controllers\Admin;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Admin\ProfileRequest;
use DreamsArk\Jobs\Admin\Profile\CreateProfileJob;
use DreamsArk\Jobs\Admin\Profile\UpdateProfileJob;
use DreamsArk\Jobs\DeleteItemByObjectJob;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Master\Questionnaire;
use Illuminate\Http\Request;

/**
 * Class ProfileController
 * @package DreamsArk\Http\Controllers\Admin
 */
class ProfileController extends Controller
{
    /**
     * @var string
     */
    private $defaultRoute = 'admin.profile.index';

    /**
     * @param Profile $profile
     * @return $this
     */
    public function index(Profile $profile)
    {

        return view('admin.profile.index')->with('profiles', $profile->all());

    }

    /**
     * @param Questionnaire $questionnaire
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @internal param Collection $selectedQuestions
     */
    public function create(Questionnaire $questionnaire)
    {
//        dd($questionnaire->users());
        return view('admin.profile.create')->with('questions', $questionnaire->all());
    }

    /**
     * @param ProfileRequest|Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ProfileRequest $request)
    {
        $response = dispatch(new CreateProfileJob($request->all()));
        if (!$response)
            return redirect()->route($this->defaultRoute)->withErrors('Unable to save record');
        return redirect()->route($this->defaultRoute)->withSuccess('Profile created successfully');
    }

    /**
     * @param Profile $profile
     * @param Questionnaire $questionnaire
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(Profile $profile, Questionnaire $questionnaire)
    {
        $profileQuestions = $profile->questions()->get(['questionnaire_id']);
        foreach ($profileQuestions->toArray() as $question)
            $selectedQuestions[] = $question['questionnaire_id'];
        return view('admin.profile.edit', compact('profile', 'selectedQuestions'))->with('questions', $questionnaire->all());
    }

    /**
     * @param Profile $profile
     * @param ProfileRequest|Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Profile $profile, ProfileRequest $request)
    {
        $response = dispatch(new UpdateProfileJob($profile, $request->all()));
        if (!$response)
            return redirect()->back()->withErrors('Unable to save record');
        return redirect()->back()->withSuccess('Profile updated successfully');
    }

    /**
     * @param Profile $profile
     * @return mixed
     */
    public function destroy(Profile $profile)
    {
        $response = dispatch(new DeleteItemByObjectJob($profile));
        if (!$response)
            return redirect()->route($this->defaultRoute)->withErrors('Unable to delete record');
        return redirect()->route($this->defaultRoute)->withSuccess('Profile deleted successfully');
    }
}

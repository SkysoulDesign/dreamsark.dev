<?php

namespace DreamsArk\Http\Controllers\Admin\Profile;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Admin\Profile\StoreProfileRequest;
use DreamsArk\Http\Requests\Admin\Profile\UpdateProfileRequest;
use DreamsArk\Jobs\Admin\Profile\CreateProfileJob;
use DreamsArk\Jobs\Admin\Profile\DeleteProfileJob;
use DreamsArk\Jobs\Admin\Profile\UpdateProfileJob;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\Master\Question\Section;
use Illuminate\Http\Request;

/**
 * Class ProfileController
 *
 * @package DreamsArk\Http\Controllers\Admin
 */
class ProfileController extends Controller
{

    /**
     * @param Profile $profile
     * @return $this
     * @todo Implement Repository
     */
    public function index(Profile $profile)
    {
        return view('admin.profile.index')->with('profiles', $profile->all());
    }

    /**
     * Displays form for creating a new Profile
     *
     * @param \DreamsArk\Models\Master\Question\Question $question
     * @param Section $section
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\
     * @todo Implement Repository
     */
    public function create(Question $question, Section $section)
    {
        return view('admin.profile.create')
            ->with('questions', $question->all())
            ->with('sections', $section->all());
    }

    /**
     * Creates a Profile
     *
     * @param StoreProfileRequest|Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreProfileRequest $request)
    {

        /**
         * Create Profile Job
         */
        $profile = dispatch(new CreateProfileJob(
            $request->except(['questions', 'required', 'category']),
            $request->get('questions', []),
            $request->get('required', []),
            $request->get('sections', [])
        ));

        return redirect()
            ->route('admin.profile.index')
            ->withSuccess("Profile: $profile->display_name created successfully");

    }

    /**
     * @param Profile $profile
     * @param Question $question
     * @param Section $section
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @todo implement Repository
     */
    public function edit(Profile $profile, Question $question, Section $section)
    {

        /**
         * Append ->selected = true to all matching pairs
         *        ->required = true|false
         *        ->section_id = id
         */
        $questions = $profile->questions->map(function ($question) {

            $question->selected = true;
            $question->required = filter_var($question->pivot->required, FILTER_VALIDATE_BOOLEAN);
            $question->section_id = $question->pivot->section_id;

            return $question;

        });

        return view('admin.profile.edit')
            ->with('questions', $question->all()->merge($questions))
            ->with('profile', $profile)
            ->with('sections', $section->all());

    }

    /**
     * @param Profile $profile
     * @param UpdateProfileRequest|Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateProfileRequest $request, Profile $profile)
    {

        /**
         * Update Profile Job
         */
        $profile = $this->dispatch(new UpdateProfileJob(
            $profile,
            $request->only(['name', 'display_name']),
            $request->get('questions', []),
            $request->get('sections', []),
            $request->get('required', [])
        ));

        return redirect()
            ->route('admin.profile.edit', $profile->name)
            ->withSuccess("Profile: $profile->display_name updated successfully");
    }

    /**
     * @param Request $request
     * @param Profile $profile
     * @return mixed
     * @todo Make the job returns the deleted $profile instead of grabbing it from the function parameters
     */
    public function destroy(Request $request, Profile $profile)
    {

        /**
         * Determines if user is authorized to perform this action
         */
        $this->authorize('delete-profile', $request->user());

        /**
         * Delete Profile
         */
        $this->dispatch(new DeleteProfileJob($profile));

        return redirect()
            ->route('admin.profile.index')
            ->withSuccess("Profile: $profile->display_name was deleted successfully");
    }

}

<?php

namespace DreamsArk\Http\Controllers\User;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\User\Profile\StoreProfileRequest;
use DreamsArk\Http\Requests\User\Profile\UpdateProfileRequest;
use DreamsArk\Jobs\User\Profile\CreateProfileJob;
use DreamsArk\Jobs\User\Profile\UpdateProfileJob;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Master\Question\Option;
use DreamsArk\Repositories\User\UserProfileRepositoryInterface;
use DreamsArk\Repositories\User\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

/**
 * Class ProfileController
 *
 * @package DreamsArk\Http\Controllers
 */
class ProfileController extends Controller
{
    private $earningTotal;

    /**
     * ProfileController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['show', 'questions']]);
    }

    /**
     * Index with listing of user Profiles
     *
     * @param Request $request
     * @param UserProfileRepositoryInterface $profile
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @internal param User $user
     */
    public function index(Request $request, UserProfileRepositoryInterface $profile)
    {
        return view('user.profile.index')
            ->with('user', $request->user())
            ->with('profiles', $profile->all());
    }

    /**
     * Show Create User Profile
     *
     * @param Profile $profile
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create(Profile $profile)
    {
        return view('user.profile.create')->with('profiles', $profile->all());
    }

    /**
     * Save User Profile
     *
     * @param StoreProfileRequest $request
     * @param Profile $profile
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreProfileRequest $request, Profile $profile)
    {

        $user = dispatch(new CreateProfileJob(
            $request->all(),
            $request->user(),
            $profile
        ));

        return redirect()->route('user.profile.index')->withSuccess(trans('profile.created-success'));
    }

    /**
     * Edit User Profile
     *
     * @param Profile $profile
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function edit(Profile $profile, Request $request)
    {

        /** @var Profile $userProfiles */
        $userProfile = $request->user()->profiles->find($profile);


        return view('user.profile.edit')
            ->with('profile', $profile)
            ->with('answers', $this->getProfileAnswers($userProfile))
            ->with('sections', $profile->questions->pluck('pivot.section')->unique());

    }

    /**
     * @param Profile $userProfile
     * @return Collection
     */
    protected function getProfileAnswers(Profile $userProfile)
    {
        /** @var Collection $answers */
        $answers = $userProfile->answers->pluck('pivot')->groupBy('question_id');
        foreach ($userProfile->answersOptions->pluck('pivot')->groupBy('question_id') as $questionId => $object)
            $answers[$questionId] = $object;

        return $answers;
    }

    /**
     * Update User Profile
     *
     * @param UpdateProfileRequest $request
     * @param Profile $profile
     * @return \Illuminate\Http\RedirectResponse
     * @internal param Profile $profile
     */
    public function update(UpdateProfileRequest $request, Profile $profile)
    {
        /**
         * Update Profile
         */
        $user = dispatch(new UpdateProfileJob(
                $request->all(),
                $request->user(),
                $profile
            )
        );

        return redirect()->route('user.profile.edit', $profile->name)
            ->withSuccess(trans('profile.updated-success'));
    }

    /**
     * @param Request $request
     * @param Profile $profile
     * @param Option $option
     * @return
     */
    public function show(Request $request, Profile $profile, Option $option)
    {

        return view('user.profile.show')
            ->with('option', $option)
            ->with('answers', $this->getProfileAnswers($request->user()->profiles->find($profile)))
            ->with('profile', $profile)
            ->with('sections', $profile->questions->pluck('pivot.section')->unique());
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @todo properly calculate the earning based on the what the user earned not on all his submissions currently implementation is wrong
     */
    public function userEarningHistory(Request $request)
    {

        $user = $request->user()->load('investments', 'enrollers', 'submissions', 'submissions.votes');

        return view('user.activity.index')
            ->with('earnings', $user->submissions)
            ->with('investments', $user->investments)
            ->with('enrollers', $user->enrollers);
    }

    /**
     * Get all the characters questions as json
     *
     * @param \Illuminate\Http\Request $request
     * @param \DreamsArk\Models\Master\Profile $profile
     * @return \Illuminate\Http\JsonResponse
     */
    public function questions(Request $request, Profile $profile)
    {

        $profile = $profile->whereName($request->input('profile'))->firstOrFail();

        return response()->json(
            $profile->questions->load('type')
        );

    }

}

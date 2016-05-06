<?php

namespace DreamsArk\Http\Controllers\User;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\User\Profile\StoreProfileRequest;
use DreamsArk\Http\Requests\User\Profile\UpdateProfileRequest;
use DreamsArk\Jobs\User\Profile\CreateProfileJob;
use DreamsArk\Jobs\User\Profile\UpdateProfileJob;
use DreamsArk\Models\Master\Answer;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Master\Question\Option;
use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\User\UserProfileRepositoryInterface;
use Illuminate\Http\Request;

/**
 * Class ProfileController
 *
 * @package DreamsArk\Http\Controllers
 */
class ProfileController extends Controller
{

    /**
     * @var string
     */
    private $defaultRoute = 'user.profile.index';

    /**
     * ProfileController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['show', 'getProfileForm']]);
    }

    /**
     * @param Request $request
     * @param UserProfileRepositoryInterface $profile
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @internal param User $user
     */
    public function index(Request $request, UserProfileRepositoryInterface $profile)
    {
        $profiles = $profile->all();
        /** @var User $user */
        $user = $request->user();

        return view('user.profile.index', compact('profiles'))->with('user_profiles', $user->profiles);
    }

    /**
     * @param Profile $profile
     * @return mixed
     */
    public function getCategories(Profile $profile)
    {
        return $profile->questions->pluck('pivot')->pluck('category')->unique()->toArray();
    }

    /**
     * @param Profile $profile
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create(Profile $profile, Request $request, Question $question)
    {
        if ($request->user()->hasProfile($profile->name))
            return redirect()->route($this->defaultRoute)->withErrors('Profile already exists');
//        $categories = $this->getCategories($profile);

        return view('user.profile.create')
            ->with('profile', $profile)
            ->with('sections', $profile->questions->pluck('pivot.section')->unique());
    }

    /**
     * @param StoreProfileRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreProfileRequest $request)
    {

//        dd($request->all());

        $user = dispatch(new CreateProfileJob($request->except('profile_id'), $request->user(), request('profile_id')));

        return redirect()->route($this->defaultRoute)->withSuccess('Profile created successfully');
    }

    /**
     * @param Profile $profile
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function edit(Profile $profile, Request $request)
    {
//        $categories = $this->getCategories($profile);
        $answers = $this->getProfileAnswers($request->user(), $profile->id);

        return view('user.profile.edit', compact('profile', 'answers'))
            ->with('sections', $profile->questions->pluck('pivot.section')->unique());
    }

    /**
     * @param $user
     * @param $profileId
     * @return array
     * @internal param Profile $profile
     */
    private function getProfileAnswers($user, $profileId)
    {
        /** @var Profile|User Profile $profile */
        $profile = $user->profiles->find($profileId);
        /** @var Answer $questionsWithAnswer */
        $questionsWithAnswer = $profile->answers;

        /** @var array $answers */
        foreach ($questionsWithAnswer as $question) {
            /** pivot contains answer */
            $answers[$question->id] = $question->pivot->toArray();
        }

        return $answers;
    }

    /**
     * @param Profile $profile
     * @param UpdateProfileRequest $request
     * @return \Illuminate\Http\RedirectResponse
     * @internal param Profile $profile
     */
    public function update(Profile $profile, UpdateProfileRequest $request)
    {
        $user = $request->user();
        /** @var Profile|User Profile $profile */
        $profile = $user->profiles->find($profile->id);
        $user = dispatch(new UpdateProfileJob($request->except('profile_id'), $request->user(), $profile));

        return redirect()->back()->withSuccess($profile->display_name . ' profile updated successfully');
    }

    /**
     * @param Profile $profile
     * @param Request $request
     * @param Option $option
     * @return
     */
    public function show(Profile $profile, Request $request, Option $option)
    {
        $isPublicProfile = false;
//        $categories = $this->getCategories($profile);
        $answers = $this->getProfileAnswers($request->user(), $profile->id);

        return view('user.profile.show', compact('profile', 'answers', 'option', 'isPublicProfile'))
            ->with('sections', $profile->questions->pluck('pivot.section')->unique());
    }

    public function showPublicProfile(Profile $profile, Request $request, Option $option){
        $isPublicProfile = true;
        /** @var User $user */
        $user = User::with('profiles')->where('username', $request->username)->get();
        if (!$user[0]->hasProfile($profile->name))
            return redirect()->route($this->defaultRoute)->withErrors('Profile not exists');
        $answers = $this->getProfileAnswers($user[0], $profile->id);
        return view('user.profile.show', compact('profile', 'answers', 'option', 'isPublicProfile'))
            ->with('sections', $profile->questions->pluck('pivot.section')->unique());
    }

}

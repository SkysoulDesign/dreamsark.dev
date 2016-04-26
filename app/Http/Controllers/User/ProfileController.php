<?php

namespace DreamsArk\Http\Controllers\User;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\User\Profile\ProfileRequest;
use DreamsArk\Jobs\User\Profile\CreateProfileJob;
use DreamsArk\Jobs\User\Profile\UpdateProfileJob;
use DreamsArk\Models\Master\Answer;
use DreamsArk\Models\Master\Profile;
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

    public function getCategories(Profile $profile)
    {
        return $profile->questions->pluck('pivot')->pluck('category')->unique()->toArray();
    }

    /**
     * @param Profile $profile
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create(Profile $profile, Request $request)
    {
        if ($request->user()->hasProfile($profile->name))
            return redirect()->route($this->defaultRoute)->withErrors('Profile already exists');
        $categories = $this->getCategories($profile);

        return view('user.profile.create', compact('profile', 'categories'));
    }

    /**
     * @param ProfileRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ProfileRequest $request)
    {
        $user = dispatch(new CreateProfileJob($request->except('profile_id'), $request->user(), request('profile_id')));

        return redirect()->route($this->defaultRoute);
    }

    /**
     * @param Profile $profile
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function edit(Profile $profile, Request $request)
    {
        $user = $request->user();

        $categories = $this->getCategories($profile);

        /** @var Profile|User Profile $profile */
        $profile = $user->profiles->find($profile->id);
        /** @var Answer $questionsWithAnswer */
        $questionsWithAnswer = $profile->answers;

        /** @var array $answers */
        foreach ($questionsWithAnswer as $question) {
            /** pivot contains answer */
            $answers[$question->id] = $question->pivot->toArray();
        }

        return view('user.profile.edit', compact('profile', 'categories', 'answers'));
    }

    /**
     * @param Profile $profile
     * @param ProfileRequest $request
     * @return \Illuminate\Http\RedirectResponse
     * @internal param Profile $profile
     */
    public function update(Profile $profile, ProfileRequest $request)
    {
        $user = $request->user();
        /** @var Profile|User Profile $profile */
        $profile = $user->profiles->find($profile->id);
        // $request->files to collect all input[type="file"] as FilesBag
        $user = dispatch(new UpdateProfileJob($request->except('profile_id'), $request->user(), $profile));

        return redirect()->route($this->defaultRoute);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function show($id)
    {
        return view('user.profile.show');
    }

}

<?php

namespace DreamsArk\Http\Controllers\User;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
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
     * @param User $user
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(User $user)
    {
        return view('user.profile.index')->with('profiles', $user->profiles()->get());
    }

    /**
     *
     */
    public function create()
    {
        $questions = [];

        return view('user.profile.create', compact('questions'));
    }

    /**
     * @param Request $request
     * @param UserProfileRepositoryInterface $profile
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @internal param $step
     */
    public function getProfileForm(Request $request, UserProfileRepositoryInterface $profile)
    {
        $stepArr = array_unique(explode('/', $request->get('step', '')));
        if (empty($stepArr))
            return 'invalid data';

        return $this->$stepArr[0]($profile, $request);
    }

    /**
     * @param UserProfileRepositoryInterface $profile
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    protected function step1(UserProfileRepositoryInterface $profile, Request $request)
    {

        $request->initialize([
            'profile'   => 1,
            'questions' => [
                200 => 'question one content',
                201 => 'question two content'
            ]
        ]);

        /** @var User $user */
        $user = User::first();
        $profile = Profile::first();

//        $user->profiles()->attach($request->get('profile'));

        $collection = collect();

       dd( $user->profiles[0]->answers);

//        foreach ($request->get('questions') as $id => $question) {
//
////            $user->profiles()->create
//
//        }
//        dd($request->get('questions'));

//        $user->profiles()->saveMany(
//            []
//        );


        dd();


        $res = $profile->all();
        foreach ($res as $profile) {
            echo $profile->display_name;

            dd($profile->questionnaire);

        }

        return view('partials.profile.step-1');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    protected function step2()
    {
        return view('partials.profile.step-2');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    protected function step3()
    {
        return view('partials.profile.step-3');
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store()
    {
        return redirect()->route($this->defaultRoute);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function edit($id)
    {
        return view('user.profile.edit');
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update($id)
    {
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

<?php

namespace DreamsArk\Http\Controllers\User;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\User\UserProfileRepositoryInterface;
use Illuminate\Http\Request;

/**
 * Class ProfileController
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
        return $this->$stepArr[0]($profile);
    }

    /**
     * @param UserProfileRepositoryInterface $profile
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    protected function step1($profile)
    {
        $res = $profile->all();
        foreach ($res as $data) {
            echo $data->display_name;
            dd($data->questions);
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

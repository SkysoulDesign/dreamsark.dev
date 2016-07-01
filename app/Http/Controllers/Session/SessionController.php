<?php

namespace DreamsArk\Http\Controllers\Session;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\Session\UserCreation;
use DreamsArk\Http\Requests\Session\UserCreationMobile;
use DreamsArk\Http\Requests\Session\UserEdition;
use DreamsArk\Jobs\Session\CreateUserJob;
use DreamsArk\Jobs\Session\UpdateUserJob;
use DreamsArk\Models\User\User;
use Faker\Generator;
use Illuminate\Http\Request;
use SkysoulDesign\SMS\SMS;

/**
 * Class SessionController
 *
 * @package DreamsArk\Http\Controllers\Session
 */
class SessionController extends Controller
{
    /**
     * SessionController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth', array('only' => ['index', 'update']));
    }

    /**
     * Display Profile Page.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        /** @var User $user */
        $user = $request->user()->load('backers');

        return view('session.profile', compact('user'));
    }

    /**
     * Display a registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('session.register');
    }

    /**
     * Dispatch command to create User
     *
     * @param UserCreation $request
     * @return \Illuminate\View\View
     */
    public function store(UserCreation $request)
    {
        /**
         * Create User
         */
        $user = $this->dispatch(new CreateUserJob($request->all()));

        return redirect()->route('user.account');

    }

    /**
     * Dispatch command to create User
     *
     * @param UserCreationMobile $request
     * @return \Illuminate\View\View
     */
    public function storeMobile(UserCreationMobile $request)
    {
        if ($request->session()->get('mobile-' . $request->get('username')) != $request->get('sms_code'))
            return redirect()->back()->withErrors('Invalid Verification Code');
        /**
         * Create User
         */
        $user = $this->dispatch(new CreateUserJob($request->except('sms_code')));

        return redirect()->route('user.account');

    }

    public function sendVerificationCode(Request $request, SMS $sms, Generator $faker)
    {
        $verifyCode = $faker->randomNumber(6);
        $mobile = $request->get('mobile_number');

        $message = '[DreamsArk] ' . $verifyCode . ' is your verification code for mobile number ending with ' . substr($mobile, strlen($mobile) - 4, 4);

        $request->session()->set('mobile-' . $mobile, $verifyCode);
        $response = $sms->send($mobile, $message);

        return response()->json($response);
    }

    /**
     * Update User Profile.
     *
     * @param UserEdition $request
     * @return \Illuminate\Http\Response
     */
    public function update(UserEdition $request)
    {
        $this->dispatch(new UpdateUserJob($request->user(), $request->all()));

        return redirect()->back();
    }

}

<?php

namespace DreamsArk\Http\Controllers\Session;

use DreamsArk\Http\Controllers\Controller;
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
        return view('user.account.index')->with('user',
            $request->user()
        );
    }


    /**
     * Dispatch command to create User
     *
     * @param UserCreationMobile $request
     * @return \Illuminate\View\View
     */
    public function storeMobile(UserCreationMobile $request)
    {

        $mobile = $request->get('mobile');
        if ($request->session()->get('mobile-' . $mobile) != $request->get('code'))
            return redirect()->back()->withErrors(trans('auth.invalid-verify-code'));
        /**
         * Create User
         */
        $inputArr = ['username' => $mobile, 'password' => $request->get('password')];
        $user = $this->dispatch(new CreateUserJob($inputArr));

        $message = trans('auth.account-created') . '. ' . trans('auth.please-update-your-personal-details');

        return redirect()->intended(route('user.settings'))->withSuccess($message);

    }

    public function sendVerificationCode(Request $request, SMS $sms, Generator $faker, User $user)
    {
        $verifyCode = $faker->randomNumber(6);

        /**
         * Validate Mobile
         */
        $this->validate($request, [
            'mobile' => 'required|numeric'
        ]);

        $mobile = $request->get('mobile');

        $userObj = $user->where('username', $mobile)->get();

        if (!$userObj->isEmpty())
            $response = ['result' => '2', 'message' => trans('auth.mobile-number-exists')];

        else {
            $message = trans('auth.sms-verify-code-template', ['verifyCode' => $verifyCode, 'mobile' => substr($mobile, strlen($mobile) - 4, 4)]);
//            $message = 'DreamsArk: ' . $verifyCode . ' is your verification code for mobile number ending with ' . substr($mobile, strlen($mobile) - 4, 4) . '';

            $request->session()->put('mobile-' . $mobile, $verifyCode);
            $response = $sms->send($mobile, $message);
        }

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

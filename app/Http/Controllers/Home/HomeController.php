<?php

namespace DreamsArk\Http\Controllers\Home;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Jobs\User\Profile\CreateProfileJob;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\User\User;
use Illuminate\Cookie\CookieJar;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request, User $user, Profile $profile)
    {

        $data = [
            'questions' => [
                1 => 'Question 1 Answer',
                2 => 'Question 2 Answer',
                3 => 'Question 3 Answer',
                4 => 'Question 4 Answer',
                5 => 'Question 5 Answer'
            ]
        ];

        /** @var Profile $profile */
        $profile = $profile->first();

        /** @var User $user */
        $user = $user->first();

        //$user->profiles Okay List with all assigned profiles
        //$user->profiles->
        
        dd();

//        dd($profile->questions[0]->answer()->create('s'));

        $this->dispatch(new CreateProfileJob($data, $profile));

//

        dd($profile->questions);

        /** @var User $user */
        $user = $user->find(1);
        dd($user->hasRole('Admin'));

        /**
         * Check if intro cookie is set
         */
        if (!$request->hasCookie('intro')) {
            return view('in');
        }

        return view('index');

    }

    /**
     * @param Request $request
     * @param CookieJar $cookie
     * @return \Illuminate\Http\RedirectResponse
     */
    public function skip(Request $request, CookieJar $cookie)
    {

        if ($request->get('skip', false)) {
            $cookie->queue(cookie('intro', 'skipped'));
        }

        return redirect()->route('home');

    }

}

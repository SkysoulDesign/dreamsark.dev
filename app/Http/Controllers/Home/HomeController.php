<?php

namespace DreamsArk\Http\Controllers\Home;

use DreamsArk\Http\Controllers\Controller;
use Illuminate\Cookie\CookieJar;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Socialite;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Response
     * @internal param Request $request
     */
    public function index(Request $request)
    {

        /**
         * to get approved in QQ for oAuth Login event
         * @todo: they instructed to use home page as callback page for first time to get approved and later can be modified to internal pages
         */
        if(strpos($request->headers->get('referer'), 'graph.qq.com')!==false || ($request->has('code') && $request->has('state'))){
            $socialUser = Socialite::driver('qq')->user();
            dd($socialUser);
        }
//        return $this->dispatch(new GetUniqueCharacters());

        /**
         * Check if intro cookie is set
         */
        /*if (!$request->hasCookie('intro')) {
            return view('in');
        }*/

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

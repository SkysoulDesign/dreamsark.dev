<?php

namespace DreamsArk\Http\Controllers\PublicData;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Master\Question\Option;
use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function showPublicProfile(Request $request, Profile $profile, Option $option)
    {
        /** @var User $user */
        $user = User::with('profiles')->where('username', $request->username)->get();
        if (!$user[0]->hasProfile($profile->name))
            return redirect()->route('user.account')->withErrors('Profile not exists');

        return view('user.profile.public-view')
            ->with('option', $option)
            ->with('answers', $this->getProfileAnswers($user[0]->profiles->find($profile)))
            ->with('profile', $profile)
            ->with('sections', $profile->questions->pluck('pivot.section')->unique());
    }

    protected function getProfileAnswers(Profile $userProfile)
    {
        /** @var Collection $answers */
        $answers = $userProfile->answers->pluck('pivot')->groupBy('question_id');
        foreach ($userProfile->answersOptions->pluck('pivot')->groupBy('question_id') as $questionId => $object)
            $answers[$questionId] = $object;

        return $answers;
    }
}

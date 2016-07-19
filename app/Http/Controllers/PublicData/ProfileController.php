<?php

namespace DreamsArk\Http\Controllers\PublicData;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Master\Question\Option;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\User\UserProfileRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

/**
 * Class ProfileController
 *
 * @package DreamsArk\Http\Controllers\PublicData
 */
class ProfileController extends Controller
{
    /**
     * @var bool
     */
    private $isIFrameCall = false;

    /**
     * @param UserProfileRepositoryInterface $profileRepositoryInterface
     * @return mixed
     */
    public function index(UserProfileRepositoryInterface $profileRepositoryInterface)
    {
        $profileList = $profileRepositoryInterface->all(['id', 'name', 'display_name']);
        $profileWithData = $profileRepositoryInterface->all();

        return view('profile.index', compact('profileList', 'profileWithData'));
    }

    /**
     * @param Request $request
     * @param Profile $profile
     * @param Option $option
     * @return mixed
     */
    public function showPublicProfile(Request $request, Profile $profile, Option $option)
    {
        /** @var User $user */
        $user = User::with('profiles')->where('username', $request->username)->get();
        if (!$user[0]->hasProfile($profile->name)) {
            if ($this->isIFrameCall)
                return view('errors.errors')->withErrors(trans('profile.not-exists'));

            return redirect()->route('user.account')->withErrors(trans('profile.not-exists'));
        }
        $userProfile = $user[0]->profiles->find($profile);

        return view('profile.public-view')
            ->with('user', $user[0])
            ->with('userProfile', $userProfile)
            ->with('option', $option)
            ->with('answers', $this->getProfileAnswers($userProfile))
//            ->with('profile', $profile)
            ->with('sections', $profile->questions->pluck('pivot.section')->unique())
            ->with('isIFrameCall', $this->isIFrameCall);
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
     * @param Request $request
     * @param Profile $profile
     * @param Option $option
     * @return mixed
     */
    public function showPublicProfileIframe(Request $request, Profile $profile, Option $option)
    {
        $this->isIFrameCall = true;

        return $this->showPublicProfile($request, $profile, $option);
    }



    /**
     * @param Profile $profile
     * @param UserProfileRepositoryInterface $profileRepositoryInterface
     * @return mixed
     */
    public function usersByProfile(Profile $profile, UserProfileRepositoryInterface $profileRepositoryInterface)
    {
        $profileList = $profileRepositoryInterface->all(['id', 'name', 'display_name']);
        $profileWithData = $profile->users()->paginate(config('defaults.general.pagination.per_page'));

        return view('profile.list', compact('profile', 'profileList', 'profileWithData'));
    }
}

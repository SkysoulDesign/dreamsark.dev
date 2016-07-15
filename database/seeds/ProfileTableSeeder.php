<?php

use DreamsArk\Jobs\Admin\Profile\CreateProfileJob;
use Illuminate\Database\Seeder;

class ProfileTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $profiles = [
            '3d-artist',
            'actor',
            'actress',
            'animation',
            'art-director',
            'camera-director',
            'concept-artist',
            'costume-designer',
            'director',
            'editor',
            'effects',
            'executive-producer',
            'lighting-artist',
            'make-up-artist',
            'packaging-designer',
            'pre-stage-project-coordinator',
            'project-coordinator',
            'prop',
            'recording-artist',
            'render-and-composite',
            'rigging-artist',
            'screenwriter',
            'script-supervisor',
            'set-designer',
            'sound-effect',
            'stage-manager',
            'storyboard-artist',
            'swing-gang',
            'voice-artist',
        ];

        foreach ($profiles as $profile) {

            $request = [
                'name' => $profile,
                'display_name' => ucwords($profile),
                'description' => $profile
            ];

            dispatch(new CreateProfileJob($request, range(1, 5), range(1, 5), array_flip(range(1, 5))));

        }

    }

}

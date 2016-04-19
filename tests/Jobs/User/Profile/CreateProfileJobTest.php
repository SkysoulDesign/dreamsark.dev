<?php

use DreamsArk\Jobs\User\Profile\CreateProfileJob;

class UserCreateProfileJobTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @test
     */
    public function it_creates_the_user_profile()
    {

        $data = [
            'questions' => [1 => 'hello world']
        ];

        $profile = dispatch(new CreateProfileJob($data));

        dd($profile);

    }
}

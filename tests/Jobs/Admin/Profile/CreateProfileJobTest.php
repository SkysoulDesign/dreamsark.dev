<?php

use Illuminate\Foundation\Testing\DatabaseTransactions;

class CreateProfileJobTest extends TestCase
{

    use DatabaseTransactions;

    /**
     * Create a Profile
     *
     * @test
     */
    public function it_creates_a_profile_in_the_database()
    {

//        $questions = [
//            'name'         => 'position',
//            'display_name' => 'Position',
//            'description'  => 'test description',
//        ];
//
//        $questions = [1, 2, 3, 4];
//
//        $profile = dispatch(new CreateProfileJob($data, $questions, [], [1 => 'general']));
//
//        $this->assertInstanceOf(Profile::class, $profile);

    }

    /**
     * Expects Events to be fired
     *
     * @test
     */
    public function it_expects_events_to_be_triggered()
    {
//        $this->expectsEvents(ProfileWasCreated::class);
//        $this->it_creates_a_profile_in_the_database();
    }

}

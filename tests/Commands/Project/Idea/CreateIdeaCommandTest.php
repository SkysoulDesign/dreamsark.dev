<?php
/**
 * Created by PhpStorm.
 * User: Rafael
 * Date: 10/25/2015
 * Time: 11:11 PM
 */

namespace Commands\Project\Idea;

use Carbon\Carbon;
use DreamsArk\Commands\Project\ChargeUserCommand;
use DreamsArk\Commands\Project\Stages\Idea\CreateIdeaCommand;
use DreamsArk\Commands\Project\Stages\Voting\CreateVotingCommand;
use DreamsArk\Events\Project\IdeaWasCreated;
use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\Idea\IdeaRepository;
use DreamsArk\Repositories\Project\Idea\IdeaRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use TestCase;

class CreateIdeaCommandTest extends TestCase
{

    use DispatchesJobs, DatabaseTransactions;

    /**
     * @test
     */
    public function it_creates_a_new_idea()
    {

        $this->dispatch(new CreateIdeaCommand(1, []));

//        $command = new CreateIdeaCommand(1, [['user' => 'hello world']]);

//        $this->expectsJobs(ChargeUserCommand::class);
//        $this->expectsJobs(CreateVotingCommand::class);
//        $this->expectsEvents(IdeaWasCreated::class);

        /**
         * Create an Idea
         */
        
//        $repository = \Mockery::mock(IdeaRepository::class);
//        $repository->shouldReceive('create')->once()->andReturn();
//
//        $event = \Mockery::mock(Dispatcher::class);
//        $carbon = \Mockery::mock(Carbon::class);
//
//        $command->handle($repository, $event, $carbon);

    }
}

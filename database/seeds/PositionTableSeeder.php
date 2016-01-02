<?php

use DreamsArk\Commands\Position\CreateExpenditurePositionCommand;
use DreamsArk\Commands\Position\CreateExpenditureTypeCommand;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;

class PositionTableSeeder extends Seeder
{

    use DispatchesJobs;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = collect(['cast', 'crew', 'expense']);
        $positions = collect(array(
            'Actress'                       => 1,
            'Location'                      => 3,
            'Rent'                          => 3,
            'Food'                          => 3,
            'Director'                      => 2,
            'Executive Producer'            => 2,
            'Camera Director'               => 2,
            'Art Director'                  => 2,
            'Actor'                         => 1,
            'Lighting Artist'               => 2,
            'Costume Designer'              => 2,
            'Make up Artist'                => 2,
            'Set Designer'                  => 2,
            'Prop'                          => 2,
            'Project Coordinator'           => 2,
            'Stage Manager'                 => 2,
            'Editor'                        => 2,
            'Packaging Designer'            => 2,
            'Rental'                        => 2,
            'Script Supervisor'             => 2,
            'Swing Gang'                    => 2,
            'Recording Artist'              => 2,
            'Other'                         => 2,
            'Screenwriter'                  => 2,
            'Concept Artist'                => 2,
            'Storyboard Artist'             => 2,
            '3D Artist'                     => 2,
            'Rigging Artist'                => 2,
            'Material and Lighting'         => 2,
            'Render and Composite'          => 2,
            'Effects'                       => 2,
            'Animation'                     => 2,
            'Sound Effect'                  => 2,
            'Voice Artist'                  => 2,
            'Music'                         => 2,
            'Non Foreseeable fee'           => 3,
            'Pre Stage Project Coordinator' => 2,
            'Miscellaneous'                 => 2,

        ));

        /**
         * Create Types
         */
        $types->each(function ($name) {
            $this->dispatch(new CreateExpenditureTypeCommand($name));
        });

        /**
         * Create Position
         */
        $positions->each(function ($type, $name) {
            $this->dispatch(new CreateExpenditurePositionCommand($name, $type));
        });

    }
}

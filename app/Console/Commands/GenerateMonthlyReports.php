<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\MonthlyReport;
use App\Models\FieldRecord;
use App\Models\ReturnVisit;
use App\Models\BibleStudy;
use App\Models\BibleStudent;
use App\Models\User;
use Carbon\Carbon;

class GenerateMonthlyReports extends Command
{
    protected $signature = 'reports:generate-monthly';
    protected $description = 'Generate monthly ministry reports for all users';

    public function handle()
    {
        $month = Carbon::now()->subMonth();
        $monthStart = $month->copy()->startOfMonth()->toDateString();
        $monthEnd = $month->copy()->endOfMonth()->toDateString();
        $monthStr = $month->format('Y-m');
        $users = User::all();
        foreach ($users as $user) {
            $field_hours = FieldRecord::where('user_id', $user->id)
                ->whereBetween('date', [$monthStart, $monthEnd])
                ->sum('hours');
            $return_visits = ReturnVisit::where('user_id', $user->id)
                ->whereBetween('last_visit_date', [$monthStart, $monthEnd])
                ->count();
            $bible_studies = FieldRecord::where('user_id', $user->id)
                ->whereBetween('date', [$monthStart, $monthEnd])
                ->sum('bible_studies');
            $bible_students = BibleStudent::where('user_id', $user->id)
                ->whereBetween('last_study_date', [$monthStart, $monthEnd])
                ->count();
            MonthlyReport::updateOrCreate(
                ['user_id' => $user->id, 'month' => $monthStr],
                [
                    'field_hours' => $field_hours,
                    'return_visits' => $return_visits,
                    'bible_studies' => $bible_studies,
                    'bible_students' => $bible_students,
                ]
            );
        }
        $this->info('Monthly reports generated for ' . $monthStr);
    }
}
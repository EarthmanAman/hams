<div className='bg-[#ffffff] m-h-[300px] flex-1 rounded-md'>
          {/* TITLE */}
          <div className='p-5'>
            <div>
              <h4>APPOINTMENTS</h4>
              {/* <p>Your next appointment today</p> */}
            </div>
            
          </div>

          {/* CALENDER  */}
          <div>
            <Calendar
              // value={selectedDay}
              // onChange={setSelectedDay}
              shouldHighlightWeekends
            />
          </div>
          
          {/* APPOINTMENTS */}
          <div className="flex flex-col space-y-3 px-5 py-5">
              <div className="border-l-2 border-[#ff5349] px-2 py-4 shadow-sm">
                <p>13 May 2023 10:00 AM</p>
                <h5>Athman Abdalla</h5>
              </div>

              <div className="border-l-2 border-[#0000FF] px-2 py-4 shadow-sm">
                <p>13 May 2023 10:00 AM</p>
                <h5>Athman Abdalla</h5>
              </div>

          </div>
        </div>
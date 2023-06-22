import { IAcademicSemister } from '../academicSemister/academicSemister.interface';
import { User } from './user.model';

// let lastUserId = 0

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};
export const genrateStudentId = async (
  academicSemister: IAcademicSemister | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  //increment by 1
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementId = `${academicSemister.year.substring(2)}${
    academicSemister.code
  }${incrementId}`;
  return incrementId;
  // console.log(incrementId);
};
export const findLastFaclutyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const genrateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFaclutyId()) || (0).toString().padStart(5, '0');
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementId = `F-${incrementId}`;
  return incrementId;
  // console.log(incrementId);
};

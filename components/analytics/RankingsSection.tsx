'use client';

import SectionCard from './SectionCard';

import type {
  BuilderRanking,
  CityRanking,
  LocalityRanking,
} from '@/types/analytics';

interface Props {
  builders: BuilderRanking[];
  cities: CityRanking[];
  localities: LocalityRanking[];
}

const MEDAL: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};

function BuilderTable({
  data,
}: {
  data: BuilderRanking[];
}) {
  return (
    <SectionCard
      title="Builder Rankings"
      subtitle="Projects & Properties"
      noPad
    >
      <div className="table-wrap">
        <table className="rtable">
          <thead>
            <tr>
              <th>#</th>
              <th>Builder</th>
              <th>Verified</th>
              <th>Projects</th>
              <th>Properties</th>
            </tr>
          </thead>

          <tbody>
            {data.map((builder) => (
              <tr key={builder.builderId}>
                <td className="rank-cell">
                  {MEDAL[builder.rank] ?? builder.rank}
                </td>

                <td>
                  <strong>{builder.builder}</strong>
                </td>

                <td>
                  {builder.verified ? '✅' : '—'}
                </td>

                <td>{builder.projects}</td>

                <td>{builder.properties}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

function CityTable({
  title,
  data,
}: {
  title: string;
  data: CityRanking[];
}) {
  return (
    <SectionCard
      title={title}
      subtitle="Projects by City"
      noPad
    >
      <div className="table-wrap">
        <table className="rtable">
          <thead>
            <tr>
              <th>#</th>
              <th>City</th>
              <th>Projects</th>
              <th>Properties</th>
            </tr>
          </thead>

          <tbody>
            {data.map((city) => (
              <tr key={city.cityId}>
                <td className="rank-cell">
                  {MEDAL[city.rank] ?? city.rank}
                </td>

                <td>
                  <strong>{city.city}</strong>
                </td>

                <td>{city.projects}</td>

                <td>{city.properties}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

function LocalityTable({
  data,
}: {
  data: LocalityRanking[];
}) {
  return (
    <SectionCard
      title="Locality Rankings"
      subtitle="Projects by Locality"
      noPad
    >
      <div className="table-wrap">
        <table className="rtable">
          <thead>
            <tr>
              <th>#</th>
              <th>Locality</th>
              <th>City</th>
              <th>Projects</th>
              <th>Properties</th>
            </tr>
          </thead>

          <tbody>
            {data.map((locality) => (
              <tr key={locality.localityId}>
                <td className="rank-cell">
                  {MEDAL[locality.rank] ?? locality.rank}
                </td>

                <td>
                  <strong>{locality.locality}</strong>
                </td>

                <td>{locality.city}</td>

                <td>{locality.projects}</td>

                <td>{locality.properties}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

export default function RankingsSection({
  builders,
  cities,
  localities,
}: Props) {
  return (
    <section>
      <div className="section-label">
        🏆 Rankings
      </div>

      <BuilderTable data={builders} />

      <div className="two-col">
        <CityTable
          title="City Rankings"
          data={cities}
        />

        <LocalityTable
          data={localities}
        />
      </div>

      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .section-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .12em;
          color: #C9A84C;
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .table-wrap {
          overflow-x: auto;
        }

        .rtable {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .rtable thead {
          background: #FAF7F2;
        }

        .rtable th {
          text-align: left;
          padding: 10px 16px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: .09em;
          color: #8A8A8A;
          font-weight: 600;
        }

        .rtable td {
          padding: 12px 16px;
          border-bottom: 1px solid #FAF7F2;
        }

        .rtable tbody tr:hover {
          background: #FAF7F2;
        }

        .rank-cell {
          font-size: 18px;
        }

        @media (max-width: 900px) {
          .two-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
